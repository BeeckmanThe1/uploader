<!-- Please update value in the {}  -->

<h1 align="center">Uploader</h1>

<div align="center">
   Solution for a challenge from  <a href="http://devchallenges.io" target="_blank">Devchallenges.io</a>.
</div>

<div align="center">
  <h3>
    <a href="https://dev-challenge-uploader.herokuapp.com/">
      Demo
    </a>
    <span> | </span>
    <a href="https://github.com/BeeckmanThe1/uploader">
      Solution
    </a>
    <span> | </span>
    <a href="https://devchallenges.io/challenges/O2iGT9yBd6xZBrOcVirx">
      Challenge
    </a>
  </h3>
</div>

<!-- TABLE OF CONTENTS -->

## Table of Contents

- [Overview](#overview)
    - [Built With](#built-with)
- [How to use](#how-to-use)
- [Contact](#contact)

## Overview

![screenshot](https://github.com/BeeckmanThe1/uploader/blob/main/src/static/readme/uploader.png)
![screenshot](https://github.com/BeeckmanThe1/uploader/blob/main/src/static/readme/loader.png)
![screenshot](https://github.com/BeeckmanThe1/uploader/blob/main/src/static/readme/uploaded.png)

### FE

#### Tweaking antdesign's upload component

The Antdesign uploader had to be tweaked so it was NOT responsible for making the api calls & error handling; instead
we use react-query for handling syncing the application with the server:

```bash
const uploadConfig: UploadProps = {
        customRequest: ({ file, onSuccess }) => {
            // our own react-query hook
            uploadImg(file as RcFile)
            // this is needed to avoid antd's component to be in control of the call being done
            onSuccess('')
        },
        fileList: [],
        multiple: true
    };

  <Dragger {...uploadConfig}>
            <p>
                <img draggable={false} width={115} height={90}
                     alt={'Icon of some mountains as a placeholder for the image or file to be uploaded.'}
                     src={Background}/>
            </p>
            <Text type="secondary">Drag & Drop your image here</Text>
        </Dragger>
```

#### uploading

1. binary upload data -> rcFile (Antdesign's upload component does that for us)
2. rcFile -> base64 (data:image/jpeg;base64,/9j/4AAQSkZJRgABAgAAAQABAAD***: very long string representing the entire img).
for this I used a custom getBase64 function I copy pasted from the internet:
```bash
const getBase64 = (file: RcFile): Promise<string> => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });
```

This base64 string is used for the preview img and as a fallback, the actual address is used where the img eventually gets saved.

To the BE we make a post call with as body a formData object containing the rcFile:

```bash
const formData = new FormData();
formData.append('file', file);

        return fetch('/api/upload', {
            method: 'post',
            body: formData
        }).finally(() => file)
```

### BE
#### init uploads dir

First we need to create the upload directory if it doesn't exist already when we spin up our server:

``` bash
const uploadsDir = path.join(__dirname, './uploads')
if (!fs.existsSync(uploadsDir)){fs.mkdirSync(uploadsDir);}
```

#### Handling the upload

At the BE side, we use Multer to
1. pick the rcData from the FormData in the request's body.
2. Create an actual file from the rcData to be saved @./dist/uploads using the original name from the uploaded img.
This looks like this:

``` bash
const uploadImg = async (req: Request, res: Response) => {
    try {
        const storage = multer.diskStorage({
            destination:  (_request, _file, callback) => callback(null, './dist/uploads'),
            filename: (_req, file: Express.Multer.File, callback: () => void) => callback(null, file.originalname)
        });
        const upload = multer({ storage }).single('file');

        upload(req, res, (error: Error) => {
            setTimeout(() => {
                if(error) return res.status(500).json(error);
                else return res.status(200).send('File is uploaded successfully');
            }, 2000)
        });
    } catch (err) {
        console.log('error!', err)
        throw new Error(err)
    }
}
```

#### serving
``` bash
app.use('/uploads', express.static(uploadsDir))
```

### Note

Saving the images as a file and serve them is one of the 3 approaches.
The other two are:
 - Saving the base64-string in a data base
 - saving the file to a (s3)bucket

The choosen approach is has no actual production value as the dist/uploads folder gets deleted at every dyno restart.

![screenshot](https://github.com/BeeckmanThe1/uploader/blob/main/src/static/readme/ephemeral-file-system-explanation.png)

Due to legal reasons I actually liked this. I do not want to have images a random person on the internet uploaded in my DB or bucket.
Choosing one of the other two approaches should not be very hard though.

### extra reading
 - https://stackoverflow.com/questions/69580982/why-base64-is-used-only-to-encode-binary-data

### Built With

- [React](https://reactjs.org/)
- [Ant Design](https://ant.design/)
- [Zustand](https://zustand-demo.pmnd.rs/)
- [TanStack Query](https://tanstack.com/query/v3/)

This application/site was created as a submission to a [DevChallenges](https://devchallenges.io/challenges) challenge.
The [challenge](https://devchallenges.io/challenges/O2iGT9yBd6xZBrOcVirx) was to build an application to complete the
given user stories.

## How To Use

To clone and run this application, you'll need [Git](https://git-scm.com)
and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer.
From your command line:

```bash
# Clone this repository
$ git clone https://github.com/BeeckmanThe1/uploader.git

# Install dependencies
$ npm install

# Build the app
$ npm run build:watch

# Run the app
$ npm run nodemon --inspect dist/main.js
```

## Contact

- Website [adflumine](https://www.adflumine.com/)
- GitHub [@BeeckmanThe1](https://{https://github.com/BeeckmanThe1})
