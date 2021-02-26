module.exports = function(api, options) {

  const { module } = options;


  api.render('./templates', { module });
  api.render(`/templates/src/store/${module}`);


}
