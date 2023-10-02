import cors from 'cors';
import express, { Request, Response } from 'express';
import multer from 'multer';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const app = express();

app.use(cors({
  origin: '*',
  credentials: true
}));

app.use(express.json());

app.post('/api/logbook', upload.single('logbook'), (req: Request, res: Response) => {

    console.log('Received form data:', req.body);
    if (req.file) {
      console.log('Received file:', req.file);
    }

    // Respond with a success message or other appropriate response
    res.status(200).send('Form data received successfully');

});

app.get('/', (req, res) => {
  res.send({ message: 'Vihicle selector code challenge' });
});

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
