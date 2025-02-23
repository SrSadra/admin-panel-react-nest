import { Link } from "react-router-dom";
import Wrapper from "../components/Wrapper";
import { useEffect, useState } from "react";
import { Product } from "../classes/product";
import axios from "axios";
import Paginator from "../components/Paginator";

const Products  = () => {

    const [products, setProducts] = useState([]);
    const [currectPage , setCurrentPage] = useState(1);
    const [lastPage , setLastpage] = useState(0);

    useEffect(() => {
        (
            async () => {
                const {data} = await axios.get(`/products?page=${currectPage}`);

                setProducts(data.data); // because we also have pagination
            }
        )();
    }, [currectPage])



    const del = async (id : number) => {
        if (window.confirm("Are you fucking sure?")){
            await axios.delete(`products/${id}`);
            setProducts(products.filter((el: Product) => el.id !== id));
        }
    }


        return (
            <Wrapper>
                {/* {addButton} */}

                <div className='pt-3 pb-2 mb-3'>
                    <Link to="/products/create" className="btn btn-secondary btn-lg active" role="button" aria-pressed="true">Add product</Link>
                </div>

                <div className="table-responsive">
                    <table className="table table-striped table-sm">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {products.map(
                            (product: Product) => {
                                return (
                                    <tr key={product.id}>
                                        <td>{product.id}</td>
                                        <td><img src={product.image} width="50"/></td>
                                        <td>{product.title}</td>
                                        <td>{product.description}</td>
                                        <td>{product.price}</td>
                                        <td>
                                        <div>
                                            <a className='btn btn-sm' onClick={() => del(product.id)}>Delete</a>
                                        </div>
                                        </td>
                                    </tr>
                                )
                            }
                        )}
                        </tbody>
                    </table>
                </div>

                <Paginator currectPage={currectPage} lastPage={lastPage} pageChanged={(currectPage) => setCurrentPage(currectPage)} />
            </Wrapper>
        );
    }

export default Products;