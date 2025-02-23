import axios from 'axios';
import React from 'react'

const ImageUpload = ({uploaded} : {uploaded: (url: string) => void}) => {
    const uploadImg = async (files: FileList | null) => {
        if (files == null) return;

        const formData = new FormData();
        formData.append("image" , files[0]); // this image header will be invoked with interceptor in backend

        const {data} = await axios.post("/upload", formData); // instead of json for file we send formdata
        console.log(data);
        uploaded(data.url) // this data is image url (this func is actually setImage for creating product)
    }

  return (
    <label className='btn btn-primary h-75 p-3'>
    upload <input type='file' hidden onChange={(e) => uploadImg(e.target.files)} />
    </label>
  )
}

export default ImageUpload
