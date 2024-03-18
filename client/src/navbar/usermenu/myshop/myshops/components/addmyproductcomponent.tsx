/** @format */

import { AppDispatch, RootState } from "@/app/store";
import {
  FormHeader,
  formStyle,
} from "@/navbar/usermenu/common/assets/formstyle";
import { Box, Modal, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SpinnerComponent from "@/components/spinnercomponent";
import { useGetProductData, usePosProductData } from "@/products/common/hooks";
import {
  useGetMyProductData,
  usePostMyProductData,
} from "../../../common/hooks/myshop.hook";
import FormFooterElement from "../elements/formfootermyproduct.element";
import FormBodyMyProductElement from "../elements/formbodymyproduct.element";
import AddNewBrandComponent from "../../brand/components/addnewbrand.component";
import { useGetListBrand } from "../../brand/common/hook/brand.hook";
import AddNewCategoryComponent from "../../category/components/addnewcategorycomponent";
import { useGetListCategory } from "../../category/common/hook/category.hook";
import { v4 as uuidv4 } from "uuid";
import { IProduct } from "@/common/interfaces/product.interface";
import { IUser } from "@/common/interfaces/user.interface";
import { setColor, setIsMessage, setMessage } from "@/common/redux/userSlice";
import { setNewBrandProduct, setNewCategoryProduct, setShowAddMyProduct } from "@/navbar/usermenu/common/redux/myproductSlice";

const AddProductComponent = () => {
  const showAddProduct = useSelector(
    (state: RootState) => state.myProducts.isShowAddMyProduct
  );
  const showAddBrand = useSelector(
    (state: RootState) => state.myProducts.isShowAddBrand
  );
  const showAddCategory = useSelector(
    (state: RootState) => state.myProducts.isShowAddCategory
  );
  const newBrand = useSelector(
    (state: RootState) => state.myProducts.newBrandProduct
  );
  const newCategory = useSelector(
    (state: RootState) => state.myProducts.newCategoryProduct
  );
  const [userId, setUserId] = useState<string>("");
  const [newMyProduct, setNewMyProduct] = useState<IProduct>({
    id: "",
    thumbnail: "",
    title: "",
    description: "",
    rating: 0,
    price: 0,
    brand: "",
    category: "",
    userId: "",
  });
  const [listBrandProduct, setListBrandProduct] = useState<Array<string>>([]);
  const [listCategoryProduct, setListCategoryProduct] = useState<Array<string>>(
    []
  );
  const dispatch = useDispatch<AppDispatch>();

  const getProduct = useGetProductData();
  const getMyProduct = useGetMyProductData();
  const postNewProduct = usePostMyProductData();
  const postProduct = usePosProductData();
  const getListBrand = useGetListBrand();
  const getListCategory = useGetListCategory();

  useEffect(() => {
    setListBrandProduct(getListBrand.data);
    setListCategoryProduct(getListCategory.data);
  }, [getListBrand.data, getListCategory.data]);

  useEffect(() => {
    if (newBrand) {
      setNewMyProduct((prevMyProduct: IProduct) => ({
        ...prevMyProduct,
        brand: newBrand,
      }));
    }
  }, [newBrand]);

  useEffect(() => {
    if (newCategory) {
      setNewMyProduct((prevMyProduct: IProduct) => ({
        ...prevMyProduct,
        category: newCategory,
      }));
    }
  }, [newCategory]);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      const listUser: IUser[] = JSON.parse(localStorage.getItem("user"));
      listUser?.map((user: IUser) => setUserId(user.id));
    }
  }, []);

  const handleOnChangeAddValue = (e: any) => {
    setNewMyProduct({ ...newMyProduct, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const thumbnail = reader.result as string;
        setNewMyProduct({ ...newMyProduct, thumbnail });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddProduct = () => {
    const demo: IProduct = {
      ...newMyProduct,
      id: uuidv4(),
      userId: userId,
    };

    console.log("demo", demo);

    if (
      !newMyProduct.thumbnail ||
      !newMyProduct.brand ||
      !newMyProduct.category ||
      !newMyProduct.title
    ) {
      dispatch(setIsMessage(true));
      dispatch(setMessage("Please fill in all fields"));
      dispatch(setColor("error"));
      return;
    } else {
      const newProduct: IProduct = {
        ...newMyProduct,
        id: uuidv4(),
        userId: userId,
      };
      postNewProduct.mutate(newProduct, {
        onSuccess: () => {
          getMyProduct.refetch();
          handleCloseAdd();
          dispatch(setIsMessage(true));
          dispatch(setMessage("Add new product success"));
          dispatch(setColor("success"));
          dispatch(setNewBrandProduct(""));
          dispatch(setNewCategoryProduct(""));
        },
      });
      postProduct.mutate(newProduct, {
        onSuccess: () => {
          getProduct.refetch();
        },
      });
    }
  };

  const handleCloseAdd = () => {
    setNewMyProduct({
      id: "",
      thumbnail: "",
      title: "",
      description: "",
      rating: 0,
      price: 0,
      brand: "",
      category: "",
      userId: "",
    });
    dispatch(setShowAddMyProduct(false));
  };

  if (getProduct.isLoading) {
    return <SpinnerComponent />;
  }

  return (
    <Box>
      <Modal open={showAddProduct}>
        <Box sx={formStyle}>
          <FormHeader sx={{ backgroundColor: "blue" }}>
            <Typography variant='h6'>Add New Product</Typography>
          </FormHeader>

          <FormBodyMyProductElement
            myProductValue={newMyProduct}
            onChangeValue={handleOnChangeAddValue}
            categoryProduct={listCategoryProduct}
            brandProduct={listBrandProduct}
            upLoadImage={handleImageUpload}
          />
          <FormFooterElement
            handleAction={handleAddProduct}
            handleClose={handleCloseAdd}
            action={"Add"}
            color={"primary"}
          />
        </Box>
      </Modal>
      {showAddBrand && <AddNewBrandComponent />}
      {showAddCategory && <AddNewCategoryComponent />}
    </Box>
  );
};

export default AddProductComponent;
