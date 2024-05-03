type Dependencies = Record<string, string>;

interface DependenciesOptions {
  dependencies?: Dependencies
  peerDependencies?: Dependencies
  optionalDependencies?: Dependencies
}

function makeModuleConst(name: string) {
  return name
    .replaceAll('@', '')
    .replaceAll('/', '')
    .replaceAll('-', '')
}

export default function({
  dependencies,
  peerDependencies,
  optionalDependencies,
}: DependenciesOptions = {}) {
  const external = [
    ...Object.keys(dependencies || {}),
    ...Object.keys(peerDependencies || {}),
    ...Object.keys(optionalDependencies || {}),
  ]
  const globals = external.reduce((acc, entry) => ({ ...acc, [entry]: makeModuleConst(entry) }), {})

  return { external, globals }
}
