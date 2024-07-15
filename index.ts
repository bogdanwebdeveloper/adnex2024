/* eslint-disable svelte/no-inner-declarations */
/* eslint-disable no-inner-declarations */
import express from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import multer from 'multer' // Import the cors middleware
import path from 'path';
import cookieParser from 'cookie-parser'
//import bcrypt from 'bcrypt';

/*import { MongoClient, ServerApiVersion } from 'mongodb';
const uri = "mongodb+srv://admin:admin@teamforge.597akoi.mongodb.net/teamforge?retryWrites=true&w=majority&appName=teamforge";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
}); 

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
*/

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(cookieParser());

app.get('/get', async (req, res) => {
  try {
    const data = await prisma.form.findMany(); // Replace 'yourModel' with your actual Prisma model
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Error fetching data' });
  }
});

app.get('/',async (req,res)=>{
  res.redirect("http://localhost:5173/authentication/signup")
})


app.get('/api/:slug', async (req, res) => {
  const slug = req.params.slug;
  console.log('Received slug:', slug); // Debugging statement
  try {
    
    const post = await prisma.form.findUnique({
      where: { slug },
    });
    const comment = await prisma.comment.findMany({
      where: {postid : post.id}
    });
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    if (!comment) {
        return res.status(404).json({ error: 'Comments not found' });
    }
    res.json({ post, comment });
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).json({ error: 'Error fetching post' });
  }
});
const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
      callBack(null, './static/images/')     // './images/' directory name where save the file
  },
  filename: (req, file, callBack) => {
      callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})
const upload = multer({ storage: storage });

app.post('/upload/:postid', upload.array('images', 10), async (req, res) => {
  const files = req.files;
  const postid = req.params.postid;
  
  if (!files) {
    return res.status(400).send('No files uploaded.');
  }

  const newImageNames = files.map(file => file.filename);

  try {
    const post = await prisma.form.findUnique({
      where: { id: postid },
      select: { images: true }
    });

    if (!post) {
      return res.status(404).send('Post not found.');
    }

    let currentImages = post.images || []; // Get current images, if any

    // Ensure images[0] is initialized if it doesn't exist
    if (currentImages.length === 0) {
      currentImages.push('');
    }

    // Fill the first empty array element with the first uploaded image
    if (currentImages[0] === '') {
      currentImages[0] = newImageNames.shift(); // Shift the first new image and assign it to images[0]
    }

    // Concatenate the new images with the existing ones
    const updatedImages = [...currentImages, ...newImageNames];

    await prisma.form.update({
      where: { id: postid },
      data: { images: updatedImages }
    });

    res.status(200).send('Files uploaded successfully.');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error uploading files.');
  }
});
app.get('deleteSession',async(req,res)=>{
  try{
    res.clearCookie('session');
    res.status(200).send('ok');
  }catch(e)
  {
    res.status(500).send('Error');
  }
 
})
/*app.post('/comment/:postid',async(req,res)=>{
  const postid = req.params.postid;
  const userid = req.cookies.session;
  const comment = req.body;
  console.log('here');
  try{
    await prisma.comment.create({
      data:{
        postid : `${postid}`,
        userid : `${userid}`,
        comment : `${comment}`

      }
      
    });
    res.status(200).send('comment created');
  }catch(e){
    console.log(e);
    res.status(500).send('error');
  }
})*/

/*
VARIANTA MATEI

app.post('/upload/:postid',upload.array('images',10),async(req,res)=>{
  const files = req.files;
  const postid = req.params.postid;
  if (!files) {
    return res.status(400).send('No files uploaded.');
  }
  
//const namesArray1 = Object.values(files).map(file => file.filename);
const namesArray2 = Object.keys(files).map(key => files[key].filename);


  
  console.log(namesArray2);
  try {
    await prisma.form.update({
      where:{id:`${postid}`},
      data:{
        images:namesArray2
      }
    })
    res.status(200).send('Files uploaded successfully.');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error uploading files.');
  }
})*/


app.get('/api1/:slug/:userid',async(req,res)=>{
  const slug = req.params.slug;
  const userid = req.params.userid;
  console.log(slug);
  const post = await prisma.form.findUnique({
    where:{slug:slug}
  });
  //console.log('here');
  const postid = post?.id;
  console.log(postid);
  console.log(userid);
  const relation = await prisma.relation.findUnique({
    where:{postId:postid}
  })
  if(relation?.userId === userid)
    {
      console.log("true");
      res.send("true");
    }
  else
  {
    console.log("false");
    res.send("false")
  } 
})


// Middleware to parse JSON request bodies
/*app.use(express.json());

app.post('/asas', async (req, res) => {
  console.log('Headers:', req.headers);
  console.log('Request body:', req.body);

  const { email, name, password } = req.body;

  console.log(email);
  console.log(name);
  console.log(password);

  if (!email || !name || !password) {
    return res.status(400).json({ error: 'Email, name, and password are required' });
  }

  try {
    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return res.status(400).json({ error: 'An account with this email already exists.' });
    }

    // Hash the password using bcrypt
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);

    // Create the new user
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hash,
      },
    });

    res.status(201).json(user);
  } catch (error) {
    console.error('Prisma error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});*/
/*const db = client.db("teamforge");
const user = db.collection("user");

app.post('/api/signup',async  function(req,res){
  const name = req.body.name;
  const email =req.body.email;
  const pass = req.body.pass;
  const password_hash = bcrypt.hashSync(pass,10);
  const emailvalid = await deepEmailValidator.validate(email);
  if(!emailvalid.valid) res.send('<script> alert(`false email adress`); window.location.replace(`http://localhost:3000/frontend/signup.html`)</script>');
  else
  {
      const dataUser = {
          "name": name,
          "email":email,
          "password":password_hash,
      }
      let foundUser;
      async function func()
      {
          foundUser = await user.findOne({ email });
          console.log(foundUser);
          if(foundUser)
          {
              res.send('<script> alert(`used email adress`); window.location.replace(`./frontend/signup.html`)</script>')
          }
          else
          {
              {
                  // eslint-disable-next-line @typescript-eslint/no-unused-vars
                  user.insertOne(dataUser,function(err, user){
                      if (err) throw err;
                      console.log("Record inserted Successfully");
                              
                  });
                          
                  res.redirect('/authentication/signin');
              }
              
          }
      }
      func();
      
  }
  
  
  
}); */


app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});