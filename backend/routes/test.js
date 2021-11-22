import EmailTemplates from 'swig-email-templates';

const Route = function(app, db, services) {
  const router = app.Router();
  router.get('/x', async (req, res) => {

       const templates = new EmailTemplates({
        swig: {
          cache: false
        },
        // juice: {
        //   webResources: {
        //     images: false      // Inline images under 8kB
        //   }
        // },
      });

      const templateDir = __dirname + `/../ws/templates`;
      templates.render(`${templateDir}/user-welcome.html`, {
        name: "Juan David",
      }, (err, html, text) => {
        res.send(html)
      });
  })


  return router;
};

export default Route;
