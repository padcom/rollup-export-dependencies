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

export default ({
  dependencies,
  peerDependencies,
  optionalDependencies,
}: DependenciesOptions = {}) => {
  const external = [
    ...Object.keys(dependencies || {}),
    ...Object.keys(peerDependencies || {}),
    ...Object.keys(optionalDependencies || {}),
  ].filter(name => !name.startsWith('@types/'))
  const globals = external.reduce((acc, entry) => ({ ...acc, [entry]: makeModuleConst(entry) }), {})

  return { external, globals }
}
