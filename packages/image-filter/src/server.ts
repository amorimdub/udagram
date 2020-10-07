import express from 'express';
import bodyParser from 'body-parser';
import { filterImageFromURL, deleteLocalFiles } from './util/util';

(async () => {


  const app = express();


  const port = process.env.PORT || 8082;

  app.use(bodyParser.json());

  app.get("/filteredimage", async (req, res) => {

    const { image_url } = req.query;

    if (!image_url) res.status(400).send({ message: "image_url query param is required" })

    try {
      const filteredpath = await filterImageFromURL(image_url!.toString());
      res.sendFile(filteredpath, null, () => {
        deleteLocalFiles([filteredpath])
      })
    } catch (error) {
      res.status(404).send({ message: "file not found" })
    }


  });

  app.get("/", async (req, res) => {
    res.send('try GET /filteredimage?image_url={{}}')
  });


  app.listen(port, () => {
    console.log(`server running http://localhost:${port}`);
    console.log(`press CTRL+C to stop server`);
  });
})();
