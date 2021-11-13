import { categoryConstants } from '../constant/constants'

const initState = {
    categories: [],
    loading: false,
    error: null
}

const buildNewCategory = (parentId, categories, category) => {
    let myCategoryList = []

    // This is work which is itself a parent
    if(parentId == undefined){
        return [
            ...categories,
            {
                _id: category._id,
                name: category.name,
                slug: category.slug,
                children: []
            }
        ]
    }

    // This is for only work if you add something as a children
    for(let cat of categories){
        if(cat._id == parentId){
            myCategoryList.push({
                ...cat,
                children: cat.children ? buildNewCategory(parentId, [...cat.children, {
                    _id: category._id,
                    name: category.name,
                    slug: category.slug,
                    parentId: category.parentId,
                    children: category.children
                }], category) : []
            })
        }else{
            myCategoryList.push({
                ...cat,
                children: cat.children ? buildNewCategory(parentId, cat.children, category) : []
            })
        }
    }

    return myCategoryList;
}

export default (state = initState, action) => {

    switch(action.type){
        case categoryConstants.GET_ALL_CATEGORIES_SUCCESS:
            state = {
                ...state,
                categories: action.payload.categories
            }
            break;
        case categoryConstants.ADD_NEW_CATEGORY_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case categoryConstants.ADD_NEW_CATEGORY_SUCCESS:
            const category = action.payload.category;
            const updateCategories = buildNewCategory(category.parentId, state.categories, category);
            console.log("Updated Categories", updateCategories);

            state = {
                ...state,
                categories: updateCategories,
                loading: false,
            }
            break;
        case categoryConstants.ADD_NEW_CATEGORY_FAILURE:
            state = {
                ...initState,
            }
            break;
    }
    return state;
}