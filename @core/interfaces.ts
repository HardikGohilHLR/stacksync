// interfaces
export interface IPackage {
  name: string;
  versions: string[];
  description?: string;
}

export interface IPackageVersion {
  version: string;
  dependencies: Record<string, string>;
  peerDependencies?: Record<string, string>;
}

export interface IPackageCombination {
  name: string;
  description: string;
  packages: Array<{
    name: string;
    version: string;
    description?: string;
  }>;
  tags: string[];
}

export interface ISelectedPackage {
  name: string;
  description: string;
  version: string;
}

export interface ICompatibilityResult {
  compatible: boolean;
  conflicts: Array<{
    package1: string;
    package2: string;
    reason: string;
  }>;
  suggestions: string[];
}
