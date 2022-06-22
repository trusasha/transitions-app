const t = require('@babel/types');

/** @type {(program: babel.NodePath<t.Node>) => boolean} */
const checkHasObserverImport = (program) => {
  let hasImport = false;
  program.traverse({
    ImportSpecifier(path) {
      if (path.node.imported.type === 'Identifier') {
        if (path.node.imported.name === 'observer') {
          if (path.parent.type === 'ImportDeclaration') {
            if (
              path.parent.source.value === 'mobx-react-lite' ||
              path.parent.source.value === 'mobx-react'
            ) {
              hasImport = true;
            }
          }
        }
      }
    },
  });
  return hasImport;
};

module.exports = function () {
  return {
    /** @type {import("@babel/core").Visitor} */
    visitor: {
      ExportDefaultDeclaration(exportPath) {
        const { declaration } = exportPath.node;
        if (declaration.type === 'CallExpression') {
          const { callee, arguments: args } = declaration;
          if (callee.type === 'Identifier') {
            if (callee.name === 'observer') {
              const identifier = args[0];
              if (identifier && identifier.type === 'Identifier') {
                const program = exportPath.parentPath;
                const hasObserverImport = checkHasObserverImport(program);
                if (hasObserverImport) {
                  program.traverse({
                    FunctionExpression(path) {
                      if (path.node.id && path.node.id.name === identifier.name) {
                        if (path.parent.type === 'VariableDeclarator') {
                          const options = args[1];
                          path.replaceWith(
                            t.callExpression(
                              t.identifier('observer'),
                              options ? [path.node, options] : [path.node],
                            ),
                          );
                          exportPath.replaceWith(t.exportDefaultDeclaration(identifier));
                          path.skip();
                        }
                      }
                    },
                  });
                }
              }
            }
          }
        }
      },
    },
  };
};
