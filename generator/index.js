module.exports = function(api, options) {

  const { module } = options;


  api.render('./templates', { module });

}
