import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import { Col, Row, Container, Table } from 'react-bootstrap';
import Input from '../../components/ui/input/Input';
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from '../../redux/actions/product.action'
import Modal from '../../components/ui/modal/Modal';
import './style.css'


const Products = (props) => {
    const [show, setShow] = useState(false);
    const [productDetailModal, setProductDetailModal] = useState(false);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [categoryParentId, setCategoryParentId] = useState('');
    const [quantity, setQuantity] = useState('');
    const [productPictures, setProductPictures] = useState([]);
    const [productDetails, setProductDetails] = useState(null);

    const product = useSelector((state) => state.product)
    const category = useSelector((state) => state.category);
    const dispatch = useDispatch();


    const handleClose = () => {

        const form = new FormData();
        form.append('name', name);
        form.append('price', price);
        form.append('quantity', quantity);
        form.append('description', description);
        form.append('category', categoryParentId);
        for (let pic of productPictures) {
            form.append('productPicture', pic);
        }
        dispatch(addProduct(form));
        setShow(false);
    }
    const handleShow = () => setShow(true);

    const createCategoryList = (categories, options = []) => {
        for (let category of categories) {
            options.push({
                value: category._id,
                name: category.name
            })
            if (category.children.length > 0) {
                createCategoryList(category.children, options)
            }
        }

        return options;
    }

    const handleProductPicture = (e) => {
        setProductPictures([
            ...productPictures,
            e.target.files[0]
        ]);
    }

    const handleCloseProductDetailModal = () => {
        setProductDetailModal(false);
    }

    const showProductDetailsModal = (product) => {
        setProductDetailModal(true);
        setProductDetails(product);

    }

    // const delButton = (product) => {

    //     const payload = {
    //         productId: product._id
    //     };
    //     dispatch(delete)

    // }

    const renderProducts = () => {
        return (
            <Table style={{ fontSize: 12 }} responsive="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Category</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        product.products.length > 0 ?
                            product.products.map(product => (
                                <tr onClick={() => showProductDetailsModal(product)} key={product._id}>
                                    <td>1</td>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>{product.quantity}</td>
                                    <td>{product.category.name}</td>
                                    {/* <td>
                                        <button onClick={() => showProductDetailsModal(product)}>Info</button>
                                        <button onClick={() => delButton(product)}>del</button>
                                    </td> */}
                                </tr>
                            )) : null
                    }
                </tbody>
            </Table>
        )
    }

    const renderAddProductModal = () => {
        return (
            <Modal
                show={show}
                handleClose={handleClose}
                modalTitle={'Add New Product'}
            >
                <Input
                    label="Name"
                    value={name}
                    placeholder={'Product Name'}
                    onChange={(e) => setName(e.target.value)}
                />
                <Input
                    label="Quantity"
                    value={quantity}
                    placeholder={'Quantity'}
                    onChange={(e) => setQuantity(e.target.value)}
                />
                <Input
                    label="Price"
                    value={price}
                    placeholder={'Price'}
                    onChange={(e) => setPrice(e.target.value)}
                />
                <Input
                    label="Description"
                    value={description}
                    placeholder={'Description'}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <select
                    value={categoryParentId}
                    className="form-control"
                    onChange={e => setCategoryParentId(e.target.value)}
                >
                    <option>Select Category</option>
                    {
                        createCategoryList(category.categories).map(option =>
                            <option key={option.name} value={option.value}>{option.name}</option>)
                    }
                </select>

                {
                    productPictures.length > 0 ?
                        productPictures.map((pic, index) =>
                            <div key={index}>
                                {pic.name}
                            </div>
                        )
                        :
                        null
                }

                <input type="file" name="productPicture" onChange={handleProductPicture} />
            </Modal>
        )
    }

    const renderProductDetailModal = () => {

        if (!productDetails) {
            return null;
        }

        return (
            <Modal
                show={productDetailModal}
                handleClose={handleCloseProductDetailModal}
                modalTitle={`Product Detail`}
                size="lg"
            >
                <Row>
                    <Col md="6">
                        <label className="key">Name</label>
                        <p className="value">{productDetails.name}</p>
                    </Col>
                    <Col md="6">
                        <label className="key">Price</label>
                        <p className="value">{productDetails.price}</p>
                    </Col>
                </Row>
                <Row>
                    <Col md="6">
                        <label className="key">Quantity</label>
                        <p className="value">{productDetails.quantity}</p>
                    </Col>
                    <Col md="6">
                        <label className="key">Category</label>
                        <p className="value">--</p>
                    </Col>
                </Row>
                <Row>
                    <Col md="12">
                        <label className="key">Description</label>
                        <p className="value">{productDetails.description}</p>
                    </Col>
                </Row>
                <Row>
                    <Col style={{ display: 'flex' }}>
                        <label className="key">Product Picture</label>
                        {productDetails.productPictures.map(picture => 
                            <div className="productImgContainer">
                                <img src={`http://localhost:2000/public/${picture.img}`} alt="" />
                            </div>
                        )}
                    </Col>
                </Row>

            </Modal>
        )
    }

    return (
        <Layout sidebar>
            <Container>
                <Row>
                    <Col md={12}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h3>Products</h3>
                            <button onClick={handleShow}>Add</button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>{renderProducts()}</Col>
                </Row>
            </Container>
            {renderAddProductModal()}
            {renderProductDetailModal()}
        </Layout>
    )
}

export default Products
