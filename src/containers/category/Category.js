import React, { useEffect, useState } from 'react';
import Layout from '../../components/layout/Layout';
import { Col, Row, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory, getAllCategory } from '../../redux/actions/category.action'
import Input from '../../components/ui/input/Input';
import Modal from '../../components/ui/modal/Modal';

const Category = (props) => {
    const category = useSelector((state) => state.category);
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const [categoryName, setCategoryName] = useState('');
    const [categoryPicture, setCategoryPicture] = useState('');
    const [categoryParentId, setCategoryParentId] = useState('');

    const handleClose = () => {

        const form = new FormData();
        
        form.append('name', categoryName);
        form.append('parentId', categoryParentId);
        form.append('categoryPicture', categoryPicture);
        dispatch(addCategory(form));
        setCategoryName('');
        setCategoryParentId('');
        
        setShow(false);
    }
    const handleShow = () => setShow(true);


    // This is example of data structure (link list and queue)
    const renderCategories = (categories) => {
        let myCategories = [];
        for (let category of categories) {
            myCategories.push(
                <li key={category.name}>
                    {category.name}
                    {category.children.length > 0 ? (<ul>{renderCategories(category.children)}</ul>) : null}
                </li>
            );
        }
        return myCategories;
    }

    const createCategoryList = (categories, options=[]) => {
        for(let category of categories){
            options.push({
                value: category._id, 
                name: category.name
            })
            if(category.children.length > 0){
                createCategoryList(category.children, options)
            }
        }

        return options;
    }

    const handleCategoryPicture = (e) => {
        setCategoryPicture(e.target.files[0]);
    }

    return (
        <Layout sidebar>
            <Container>
                <Row>
                    <Col md={12}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h3>Category</h3>
                            <button onClick={handleShow}>Add</button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <ul>
                            {renderCategories(category.categories)}
                        </ul>
                    </Col>
                </Row>
            </Container>
            <Modal 
                show={show}
                handleClose={handleClose}
                modalTitle={'Add New Category'}
            >
                <Input 
                    value={categoryName}
                    placeholder={'Category Name'}
                    onChange={(e) => setCategoryName(e.target.value)}
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
                <input type="file" name="categoryPicture" onChange={handleCategoryPicture}/>
            </Modal>
        </Layout>
    )
}

export default Category
