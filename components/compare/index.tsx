// Compare
'use client';
import { useState } from 'react';
import useDebouncedEffect from 'use-debounced-effect';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { Search, AlertTriangle, CheckCircle2, X, Package, Boxes, Plus, ChevronDown } from 'lucide-react';

import { searchPackages, getPackageVersions, checkCompatibility } from '@/lib/api';
import { ICompatibilityResult, IPackage, ISelectedPackage } from '@/@core/interfaces';
import { popularCombinations } from '@/@core/constants';

import { Badge, Button, Alert, AlertDescription } from '@/components/imports';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/imports';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/imports';

export const Compare = () => {
  const [search, setSearch] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);

  const [packages, setPackages] = useState<IPackage[]>([]);
  const [selectedPackages, setSelectedPackages] = useState<ISelectedPackage[]>([]);
  const [versions, setVersions] = useState<Record<string, string[]>>({});

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ICompatibilityResult | null>(null);
  const [searchLoading, setSearchLoading] = useState(false);

  useDebouncedEffect(
    () => {
      fetchPackages();
    },
    1500,
    [search]
  );

  // Search all packages
  const fetchPackages = async () => {
    if (search?.trim()?.length < 2) {
      setPackages([]);
      return;
    }

    setSearchLoading(true);

    try {
      const results = await searchPackages(search);
      setPackages(results || []);
    } finally {
      setSearchLoading(false);
    }
  };

  // Select a package
  const handle = {
    selectPackage: async (pkg: IPackage) => {
      if (!pkg || selectedPackages?.some((p) => p?.name === pkg?.name)) return;

      try {
        const pkgVersions = await getPackageVersions(pkg?.name);

        setVersions((prev) => ({ ...prev, [pkg?.name]: pkgVersions || [] }));

        setSelectedPackages((prev) => [
          ...prev,
          { name: pkg?.name, description: pkg?.description || '', version: pkgVersions?.[0] || '' },
        ]);

        setSearch('');
        setOpen(false);
      } catch (error) {
        console.error('Error fetching package versions:', error);
      }
    },

    removePackage: (packageName: string) => {
      setSelectedPackages((prev) => prev?.filter((p) => p?.name !== packageName));
      setResult(null);
    },
    updatePackageVersion: (packageName: string, version: string) => {
      setSelectedPackages((prev) => prev?.map((p) => (p?.name === packageName ? { ...p, version } : p)));
      setResult(null);
      setSearch('');
    },
    selectCombination: async (combination: (typeof popularCombinations)[0]) => {
      setSelectedPackages([]);
      setVersions({});
      setResult(null);
      setSearch('');

      for (const pkg of combination?.packages) {
        try {
          const pkgVersions = await getPackageVersions(pkg?.name);
          setVersions((prev) => ({ ...prev, [pkg.name]: pkgVersions || [] }));

          setSelectedPackages((prev) => [
            ...prev,
            { name: pkg?.name, description: pkg?.description || '', version: pkg?.version },
          ]);
        } catch (error) {
          console.error(`Error fetching versions for ${pkg?.name}:`, error);
        }
      }
    },
  };

  const handleCheckCompatibility = async () => {
    if (selectedPackages?.length === 0) return;

    setLoading(true);
    try {
      const IcompatibilityResult = await checkCompatibility(selectedPackages);
      setResult(IcompatibilityResult);
    } catch (error) {
      console.error('Error checking compatibility:', error);
      setResult({
        compatible: false,
        conflicts: [
          {
            package1: 'unknown',
            package2: 'unknown',
            reason: 'An error occurred while checking compatibility',
          },
        ],
        suggestions: ['Please try again'],
      });
    } finally {
      setLoading(false);
      setSearch('');
    }
  };

  return (
    <>
      <div className="pt-48 pb-20 md:pb-24">
        <div className="container">
          <div className="flex flex-col items-center gap-4 text-center">
            <h1 className="text-secondary text-3xl leading-10 font-bold md:text-4xl lg:text-5xl lg:leading-18 xl:text-6xl">
              Compare Package Versions
            </h1>

            <p className="text-secondary text-base">
              Check compatibility between different package versions and ensure they work together seamlessly.
            </p>
          </div>
        </div>
      </div>

      <section className="pt-10 pb-14 md:pb-20">
        <div className="container">
          <div className="flex flex-col gap-10">
            <div className="mx-auto w-full max-w-3xl">
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <div className="flex cursor-pointer items-center justify-center gap-3 rounded-2xl border px-5 py-4">
                    <Plus className="text-secondary size-5" />
                    <p className="text-secondary text-base font-medium">Search Packages</p>
                  </div>
                </PopoverTrigger>

                <PopoverContent className="text-secondary bg-background w-full p-0 shadow-none">
                  <Command>
                    <CommandInput
                      placeholder="Search npm packages..."
                      value={search}
                      onValueChange={setSearch}
                      className="w-full text-base focus:ring-0"
                    />

                    <CommandList className="bg-background w-full min-w-3xl rounded-md">
                      {searchLoading ? (
                        <div className="jus flex items-center justify-center py-6 text-center text-sm">
                          <div className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                          Searching packages...
                        </div>
                      ) : (
                        <>
                          <CommandEmpty className="py-4 text-center text-sm">No packages found.</CommandEmpty>

                          <CommandGroup>
                            {packages?.map((pkg) => (
                              <CommandItem
                                key={pkg?.name}
                                value={pkg?.name}
                                onSelect={() => handle.selectPackage(pkg)}
                                className="flex cursor-pointer items-center gap-4 p-3"
                              >
                                <Package className="h-4 w-4" />

                                <div className="flex flex-col">
                                  <span className="font-medium">{pkg?.name}</span>
                                  {pkg?.description && (
                                    <span className="text-secondary max-w-[400px] truncate text-xs">
                                      {pkg?.description}
                                    </span>
                                  )}
                                </div>
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </>
                      )}
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            {/* Packages */}
            {selectedPackages?.length > 0 && (
              <div className="bg-background rounded-2xl border p-6 md:p-8">
                <div className="flex flex-col gap-8">
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
                    {selectedPackages.map((pkg: ISelectedPackage) => (
                      <div key={pkg?.name} className="flex items-center justify-between gap-4">
                        <div className="text-secondary flex shrink-0 flex-col">
                          <p className="text-base font-semibold">{pkg?.name}</p>
                          <span className="text-sm font-medium">{pkg?.description}</span>
                        </div>

                        <div className="flex gap-2">
                          <Popover key={pkg?.name}>
                            <PopoverTrigger asChild>
                              <div className="flex w-[140px] cursor-pointer items-center justify-between gap-3 rounded-xl border px-5 py-2">
                                <p className="text-secondary text-sm font-medium">{pkg?.version}</p>
                                <ChevronDown className="text-secondary h-4 w-4 shrink-0" />
                              </div>
                            </PopoverTrigger>

                            <PopoverContent className="bg-background w-full p-0 shadow-none">
                              <Command className="rounded-lg border shadow-md md:min-w-[450px]">
                                <CommandInput placeholder="Type a command or search..." className="text-secondary" />
                                <CommandList>
                                  <CommandEmpty className="text-secondary">No results found.</CommandEmpty>
                                  <CommandGroup heading="Versions" className="text-secondary">
                                    {(versions[pkg?.name] || [])?.map((version) => (
                                      <CommandItem
                                        key={version}
                                        value={version}
                                        className="text-secondary cursor-pointer"
                                        onSelect={() => handle.updatePackageVersion(pkg?.name, version)}
                                      >
                                        {version}
                                      </CommandItem>
                                    ))}
                                  </CommandGroup>
                                </CommandList>
                              </Command>
                            </PopoverContent>
                          </Popover>

                          <button
                            onClick={() => handle.removePackage(pkg?.name)}
                            className="hover:text-primary cursor-pointer"
                          >
                            <X className="text-secondary size-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Compare button */}
                  <Button
                    className="h-12 w-full rounded-lg text-white"
                    onClick={handleCheckCompatibility}
                    disabled={selectedPackages?.length < 2 || loading}
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                        Checking Compatibility...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Search className="h-4 w-4" />
                        Check Compatibility
                      </span>
                    )}
                  </Button>

                  {result && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                      <Alert
                        variant={result.compatible ? 'default' : 'destructive'}
                        className={clsx(
                          'flex items-center gap-2',
                          result.compatible
                            ? 'border-green-200 bg-green-50 text-green-700'
                            : 'border-red-200 bg-red-50 text-red-700'
                        )}
                      >
                        {result?.compatible ? (
                          <CheckCircle2 className="h-4 w-4" />
                        ) : (
                          <AlertTriangle className="h-4 w-4" />
                        )}

                        <AlertDescription>
                          {result?.compatible
                            ? 'The selected package versions appear to be compatible.'
                            : 'There are compatibility issues between the selected packages.'}
                        </AlertDescription>
                      </Alert>

                      {result?.conflicts?.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="space-y-2 rounded-lg border border-red-200 bg-red-50 p-4"
                        >
                          <h4 className="font-medium text-red-700">Conflicts:</h4>
                          <ul className="space-y-2">
                            {result?.conflicts?.map((conflict) => (
                              <li key={conflict?.reason} className="text-sm text-red-600">
                                {conflict?.reason}
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}

                      {result?.suggestions?.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="rounded-lg border border-blue-200 bg-blue-50 p-4"
                        >
                          <h4 className="mb-2 font-medium text-blue-700">Suggestions:</h4>
                          <ul className="list-inside list-disc space-y-1">
                            {result?.suggestions?.map((suggestion) => (
                              <li key={suggestion} className="text-sm text-blue-600">
                                {suggestion}
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </motion.div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Popular Combinations */}
      <section className="py-24">
        <div className="container">
          {/* Popular Combinations */}
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-4 text-center">
              <h2 className="text-secondary text-3xl font-bold md:text-4xl">Popular Combinations</h2>
              <p className="text-secondary text-base">
                Everything you need to manage your package dependencies and ensure smooth integration.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {popularCombinations?.map((combination, index) => (
                <motion.div
                  key={combination.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group hover:border-primary bg-background relative cursor-pointer rounded-xl border p-4 transition-all md:p-6"
                  onClick={() => handle.selectCombination(combination)}
                >
                  <div className="flex items-start gap-4">
                    <div className="text-primary rounded-lg p-2">
                      <Boxes className="h-6 w-6" />
                    </div>

                    <div className="flex flex-1 flex-col gap-6">
                      <div className="flex flex-col gap-2">
                        <h3 className="text-secondary text-lg font-semibold">{combination?.name}</h3>
                        <p className="text-secondary text-sm">{combination?.description}</p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {combination?.tags?.map((tag, i) => (
                          <Badge key={i} variant="secondary" className="bg-border text-sm">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
