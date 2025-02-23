import React, { SyntheticEvent, useRef, useState } from 'react'
import Wrapper from '../components/Wrapper'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ImageUpload from './ImageUpload';

const ProductCreate = () => {
    const [name, setName] = useState("");
    const [description , setDescription] = useState("");
    const [image , setImage] = useState("");
    const [price , setPrice] = useState("");
    const ref = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    const onSubmit = async  (e : SyntheticEvent) => {
        e.preventDefault();

        await axios.post("/products/create" , {
            title: name,
            description,
            image,
            price
        });

        await navigate("/products");
    }

    const updateImage = (url : string) => {
        if (ref.current){
            ref.current.value = url;
        }

        setImage(url);
    }

  return (
    <Wrapper>
        <div className='registration-form' >
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <input type="text" className="form-control item" id="name" placeholder="name" onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="form-group">
                <input type="text" className="form-control item" id="desc" placeholder="description" onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div className="form-group">
                <div className='input-group'>
                <input type="text" className="form-control item" id="image" placeholder="image" ref={ref} value={image.split("/uploads/")[1]} onChange={(e) => setImage(e.target.value)} />
                <ImageUpload uploaded={updateImage}/>
                </div>
            </div>
            <div className="form-group">
                <input type="text" className="form-control item" id="price" placeholder="price" onChange={(e) => setPrice(e.target.value)} />
            </div>
            <div className="form-group">
                <button type="button" className="btn btn-block create-account">Create Product</button>
            </div>
        </form> 
        </div>
    </Wrapper>
  )
}

export default ProductCreate
