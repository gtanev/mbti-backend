const paths = [];

export default class IndexController {
  static getRegisteredEndpoints = async (req, res) => {
    res.status(200).send({ registered_paths: paths });
  };
}

export const registerPaths = (path, layer) => {
  if (layer.route) {
    layer.route.stack.forEach(registerPaths.bind(null, path.concat(split(layer.route.path))))
  } else if (layer.name === 'router' && layer.handle.stack) {
    layer.handle.stack.forEach(registerPaths.bind(null, path.concat(split(layer.regexp))))
  } else if (layer.method) {
    paths.push(layer.method.toUpperCase() + ' /' + path.concat(split(layer.regexp))
        .filter(Boolean)
        .join('/'));
  }
};

const split = (str) => {
  if (typeof str === 'string') return str.split('/');
  if (str.fast_slash) return '';

  const match = str.toString()
      .replace('\\/?', '')
      .replace('(?=\\/|$)', '$')
      .match(/^\/\^((?:\\[.*+?^${}()|[\]\\\/]|[^.*+?^${}()|[\]\\\/])*)\$\//);

  return match
      ? match[1].replace(/\\(.)/g, '$1').split('/')
      : '<complex:' + str.toString() + '>';
};




