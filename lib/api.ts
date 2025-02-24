// APIs
import semver from 'semver';
import { IPackage, IPackageVersion } from '@/@core/interfaces';

// Cache for package search results and metadata
const searchCache = new Map<string, IPackage[]>();
const versionsCache = new Map<string, string[]>();
const packageMetadataCache = new Map<string, Record<string, IPackageVersion>>();

// To Search a Package
export const searchPackages = async (query: string): Promise<IPackage[]> => {
  if (!query || query?.length < 2) return [];

  if (searchCache.has(query)) {
    return searchCache.get(query)!;
  }

  try {
    const response = await fetch(`https://registry.npmjs.org/-/v1/search?text=${encodeURIComponent(query)}&size=10`);

    const data = await response.json();

    if (!data || !Array.isArray(data.objects)) {
      console.warn('Invalid response format from npm registry');
      return [];
    }

    const packages = data?.objects?.map((obj: any) => ({
      name: obj?.package?.name,
      description: obj?.package?.description,
      versions: [],
    }));

    searchCache.set(query, packages);

    return packages;
  } catch (error: any) {
    console.error('Error searching packages:', error.message);

    return [];
  }
};

// Get versions of packages
export const getPackageVersions = async (packageName: string): Promise<string[]> => {
  if (!packageName) return [];

  if (versionsCache.has(packageName)) {
    return versionsCache.get(packageName)!;
  }

  try {
    const response = await fetch(`https://registry.npmjs.org/${encodeURIComponent(packageName)}`);

    const data = await response.json();

    if (!data || !data?.versions) {
      console.warn('Invalid package data received from npm registry');
      return [];
    }

    const versions = Object.keys(data?.versions)
      .filter((version) => semver.valid(version))
      .filter((version) => !version.includes('-'))
      .sort((a, b) => semver.rcompare(a, b));

    versionsCache.set(packageName, versions);
    return versions;
  } catch (error: any) {
    console.error('Error fetching package versions:', error.message);

    return [];
  }
};

// Get package metadata
export const getPackageMetadata = async (packageName: string, version: string): Promise<IPackageVersion | null> => {
  if (!packageName || !version) return null;

  try {
    if (!packageMetadataCache.has(packageName)) {
      const response = await fetch(`https://registry.npmjs.org/${encodeURIComponent(packageName)}`);

      const data = await response.json();

      if (!data || !data.versions) {
        console.warn('Invalid package metadata received from npm registry');
        return null;
      }

      packageMetadataCache.set(packageName, data.versions);
    }

    const versions = packageMetadataCache.get(packageName)!;
    return versions[version] || null;
  } catch (error: any) {
    console.error('Error fetching package metadata:', error.message);

    return null;
  }
};

export const checkCompatibility = async (
  packages: { name: string; version: string }[]
): Promise<{
  compatible: boolean;
  conflicts: Array<{
    package1: string;
    package2: string;
    reason: string;
  }>;
  suggestions: string[];
}> => {
  if (!packages.length) {
    return {
      compatible: true,
      conflicts: [],
      suggestions: ['Add packages to check compatibility'],
    };
  }

  const conflicts: Array<{ package1: string; package2: string; reason: string }> = [];
  const suggestions: string[] = [];

  try {
    // Get metadata for all packages
    const packagesMetadata = await Promise.all(
      packages.map(async (pkg) => ({
        name: pkg?.name,
        version: pkg?.version,
        metadata: await getPackageMetadata(pkg?.name, pkg?.version),
      }))
    );

    // Check for failed metadata fetches
    const failedFetches = packagesMetadata.filter((pkg) => !pkg?.metadata);
    if (failedFetches?.length > 0) {
      return {
        compatible: false,
        conflicts: failedFetches.map((pkg) => ({
          package1: pkg?.name,
          package2: 'unknown',
          reason: `Unable to fetch metadata for ${pkg?.name}@${pkg?.version}`,
        })),
        suggestions: ['Please try again or check package names and versions'],
      };
    }

    // Check peer dependencies
    for (const pkg of packagesMetadata) {
      console.log('pkg.metadata?.peerDependencies', pkg.name, pkg.metadata?.peerDependencies);
      if (!pkg?.metadata?.peerDependencies) continue;

      for (const [peerName, peerVersion] of Object.entries(pkg?.metadata?.peerDependencies)) {
        const selectedPeer = packages?.find((p) => p?.name === peerName);
        console.log('selectedPeer', selectedPeer);

        if (!selectedPeer) {
          suggestions.push(`${pkg?.name} requires ${peerName}@${peerVersion} as a peer dependency`);
          continue;
        }

        if (!semver.satisfies(selectedPeer.version, peerVersion)) {
          conflicts.push({
            package1: pkg?.name,
            package2: peerName,
            reason: `${pkg?.name}@${pkg?.version} requires ${peerName}@${peerVersion}, but ${peerName}@${selectedPeer?.version} is selected`,
          });
        }
      }
    }

    // Check for common patterns and potential issues
    const hasReact = packages.some((p) => p?.name === 'react');
    const hasReactDom = packages.some((p) => p?.name === 'react-dom');
    const hasNextJs = packages.some((p) => p?.name === 'next');

    if (hasReact && !hasReactDom) {
      suggestions.push('React usually requires react-dom as a peer dependency');
    }

    if (hasNextJs) {
      const reactPkg = packages?.find((p) => p?.name === 'react');

      if (reactPkg && semver.major(reactPkg?.version) < 18) {
        suggestions.push('Next.js works best with React 18 or higher');
      }
    }

    return {
      compatible: conflicts?.length === 0,
      conflicts,
      suggestions,
    };
  } catch (error: any) {
    console.error('Error checking compatibility:', error);
    return {
      compatible: false,
      conflicts: [
        {
          package1: 'unknown',
          package2: 'unknown',
          reason: 'An error occurred while checking compatibility',
        },
      ],
      suggestions: ['Please try again'],
    };
  }
};
