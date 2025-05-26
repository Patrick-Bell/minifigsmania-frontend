import { useEffect, useState } from "react";
import axios from "axios";
import { AiOutlineProduct } from "react-icons/ai";
import { CiCalendarDate } from "react-icons/ci";
import { TbShoppingCartCancel } from "react-icons/tb";
import { TbLego } from "react-icons/tb";
import AdminDeleteProductModal from "./AdminDeleteProductModal";
import { FaRegFilePdf } from "react-icons/fa6";
import { GrPrint, GrUpdate } from "react-icons/gr";
import { PaperClipIcon } from '@heroicons/react/20/solid'
import { FaCircle } from "react-icons/fa";
import AdminUpdateOrderSelect from "./AdminUpdateOrderSelect";
import { Toaster, toast } from 'sonner';
import AdminImageSection from "./AdminImageSection";


const AdminInventory = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [seletedProduct, setSelectedProduct] = useState(null);
  const [editProduct, setEditProduct] = useState(null);

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    sale_price: "",
    stock: "",
    category: "",
    tag: "",
    height: 4,
    weight: 2.5,
    accessories: ""
  });

  const [addProductSection, setAddProductSection] = useState(false);
  const [ImageSection, setImageSection] = useState(false)

  const fetchProducts = async () => {
    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/products`);

    setProducts(response.data);
  };

  const openDeleteModal = async (product) => {
    setShowModal(true);
    setSelectedProduct(product);
  }
  
  const deleteProduct = async () => {
    const response = await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/products/${seletedProduct.id}`);

    await fetchProducts();
    setShowModal(false)
  }

  useEffect(() => {
    fetchProducts();
  }, [seletedProduct, newProduct, editProduct]);

  const openAddProduct = () => {
    setAddProductSection(true);
  }

  // Calculating stats
  const totalStock = products.reduce((acc, product) => acc + product.stock, 0);
  const totalProducts = products.length;
  const itemsLast7Days = products.filter(product => {
    const addedDate = new Date(product.addedAt);
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    return addedDate >= sevenDaysAgo;
  }).length;
  const outOfStock = products.filter(product => product.stock === 0).length;


  const addProduct = async () => {
    try{
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/products`, newProduct);
      console.log(response.data);
      toast.success('Product added successfully');
      setNewProduct({
        name: "",
        price: "",
        sale_price: "",
        stock: "",
        category: "",
        tag: "",
        height: 4,
        weight: 2.5,
        accessories: ""
      });
    }catch(e){
      console.log(e)
    }
  }

  const editOneProduct = async (id) => {
    try{
      const response = await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/products/${id}`, editProduct);
      toast.success('Product editted successfully', {
        description: `${editProduct?.name} has been changed.`
      });
    }catch(e){
      console.log(e)
    }
  }


  const handleProductActiveChange = async (productId, newStatus) => {
    try {
        await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/products/${productId}`, { active: newStatus });
        toast.success(`Product is now ${newStatus === true ? 'active' : 'deactive'}`)

        setProducts((prevProducts) => 
            prevProducts.map((product) => 
                product.id === productId ? { ...product, active: newStatus } : product
            )
        );
    } catch (error) {
        console.error("Error updating review status:", error);
    }
};

const handleImageSection = (product) => {
  setSelectedProduct(product)
  setImageSection(true)
  console.log(product, 'rendering image section for this product')
}

const handleImageBack = () => {
  setSelectedProduct(null)
  setImageSection(false)
}



  return (
    <div className="p-6 bg-white rounded-lg border border-[#e9ebee]">
      <AdminDeleteProductModal open={showModal} setOpen={setShowModal} deleteProduct={deleteProduct} product={seletedProduct} />
      <Toaster />
      
      {/* Stats Cards */}
      {editProduct ? (
        <>
            <div className="flex justify-between items-middle">
                <span className="text-indigo-600 font-bold text-2xl"></span>
                <div className="flex gap-2">
                <button className="px-4 py-2 rounded-md border mb-4 border-[#e9ebee] hover:bg-gray-50 cursor-pointer"><GrPrint /></button>
                <button className="px-4 py-2 rounded-md border mb-4 border-[#e9ebee] hover:bg-gray-50 cursor-pointer"><FaRegFilePdf /></button>
                <button onClick={() => setEditProduct(null)} className="px-4 py-2 rounded-md border mb-4 border-[#e9ebee] hover:bg-gray-50 cursor-pointer">Back</button>
                </div>
                </div>    
                <div>
      <div className="px-4 sm:px-0">
        <h3 className="text-base/7 font-semibold text-gray-900">Product Information</h3>
        <p className="mt-1 max-w-2xl text-sm/6 text-gray-500">View and edit product data.</p>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <p className="text-sm/6 font-medium text-gray-900">Name</p>
            <input 
              type="text"
              className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0 border border-gray-300 rounded-md p-2"
              value={editProduct.name || ''}  // ✅ Ensures it doesn't crash on undefined values
              onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })}  // ✅ Updates state on change
            />
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">Price</dt>
            <input 
              type="text"
              className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0 border border-gray-300 rounded-md p-2"
              value={editProduct.price || ''}  // ✅ Ensures it doesn't crash on undefined values
              onChange={(e) => setEditProduct({ ...editProduct, price: e.target.value })}  // ✅ Updates state on change
            />
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">Sale Price</dt>
            <input 
              type="text"
              className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0 border border-gray-300 rounded-md p-2"
              value={editProduct.sale_price || ''}  // ✅ Ensures it doesn't crash on undefined values
              onChange={(e) => setEditProduct({ ...editProduct, sale_price: e.target.value })}  // ✅ Updates state on change
            />
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">Stock</dt>
            <input 
              type="text"
              className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0 border border-gray-300 rounded-md p-2"
              value={editProduct.stock || ''}  // ✅ Ensures it doesn't crash on undefined values
              onChange={(e) => setEditProduct({ ...editProduct, stock: e.target.value })}  // ✅ Updates state on change
            />
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">Category</dt>
            <input 
              type="text"
              className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0 border border-gray-300 rounded-md p-2"
              value={editProduct.category || ''}  // ✅ Ensures it doesn't crash on undefined values
              onChange={(e) => setEditProduct({ ...editProduct, category: e.target.value })}  // ✅ Updates state on change
            />
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">Accessories</dt>
            <input 
              type="text"
              className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0 border border-gray-300 rounded-md p-2"
              placeholder="accessory1, accessory2 & accessory3"
              value={editProduct.accessories || ''}  // ✅ Ensures it doesn't crash on undefined values
              onChange={(e) => setEditProduct({ ...editProduct, accessories: e.target.value })}  // ✅ Updates state on change

            />
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">Tag</dt>
            <AdminUpdateOrderSelect 
                    options={[
                        { value: "sale", label: "Sale", icon: <FaCircle className="text-red-600" /> },
                        { value: "new", label: "New", icon: <FaCircle className="text-green-600" /> },
                        { value: "popular", label: "Popular", icon: <FaCircle className="text-green-600" /> },
                        { value: "limited", label: "Limited", icon: <FaCircle className="text-yellow-600" /> },
                        { value: "none", label: "None", icon: <FaCircle className="bg-black-600 text-black-600" /> }
                    ]}
                    selected={editProduct.tag || ''} 
                    setSelected={(value) => setEditProduct({ ...editProduct, tag: value })}
                />
          </div>
         
        </dl>
      </div>
      <button onClick={() => editOneProduct(editProduct?.id)} className="w-full bg-indigo-600 p-2 rounded-md text-white hover:bg-indigo-700 cursor-pointer transition-all">Confirm</button>
    </div>
    </>
      ): addProductSection ? (
          <>
            <>
            <div className="flex justify-between items-middle">
                <span className="text-indigo-600 font-bold text-2xl"></span>
                <div className="flex gap-2">
                <button className="px-4 py-2 rounded-md border mb-4 border-[#e9ebee] hover:bg-gray-50 cursor-pointer"><GrPrint /></button>
                <button className="px-4 py-2 rounded-md border mb-4 border-[#e9ebee] hover:bg-gray-50 cursor-pointer"><FaRegFilePdf /></button>
                <button onClick={() => setAddProductSection(false)} className="px-4 py-2 rounded-md border mb-4 border-[#e9ebee] hover:bg-gray-50 cursor-pointer">Back</button>
                </div>
                </div>    
                <div>
      <div className="px-4 sm:px-0">
        <h3 className="text-base/7 font-semibold text-gray-900">Add Product</h3>
        <p className="mt-1 max-w-2xl text-sm/6 text-gray-500">Create a new product.</p>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <p className="text-sm/6 font-medium text-gray-900">Name</p>
            <input 
              type="text"
              className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0 border border-gray-300 rounded-md p-2"
              value={newProduct.name || ''}  // ✅ Ensures it doesn't crash on undefined values
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}  // ✅ Updates state on change
            />
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <p className="text-sm/6 font-medium text-gray-900">Height</p>
            <input 
              type="text"
              className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0 border border-gray-300 rounded-md p-2"
              value={newProduct.height || ''}  // ✅ Ensures it doesn't crash on undefined values
              onChange={(e) => setNewProduct({ ...newProduct, height: e.target.value })}  // ✅ Updates state on change
            />
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <p className="text-sm/6 font-medium text-gray-900">Weight</p>
            <input 
              type="text"
              className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0 border border-gray-300 rounded-md p-2"
              value={newProduct.weight || ''}  // ✅ Ensures it doesn't crash on undefined values
              onChange={(e) => setNewProduct({ ...newProduct, weight: e.target.value })}  // ✅ Updates state on change
            />
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">Price</dt>
            <div class="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
      <div class="shrink-0 text-base text-gray-500 select-none sm:text-sm/6">£</div>
      <input value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} type="text" name="price" id="price" class="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6" placeholder="0.00"/>
      <div class="grid shrink-0 grid-cols-1 focus-within:relative">
        <select id="currency" name="currency" aria-label="Currency" class="col-start-1 row-start-1 w-full appearance-none rounded-md py-1.5 pr-7 pl-3 text-base text-gray-500 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
          <option>GBP</option>
        </select>
        <svg class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon">
          <path fill-rule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
        </svg>
      </div>
    </div>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">Sale Price</dt>
            <div class="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
      <div class="shrink-0 text-base text-gray-500 select-none sm:text-sm/6">£</div>
      <input value={newProduct.sale_price} onChange={(e) => setNewProduct({ ...newProduct, sale_price: e.target.value })} type="text" name="sale_price" id="sale_price" class="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6" placeholder="0.00"/>
      <div class="grid shrink-0 grid-cols-1 focus-within:relative">
        <select id="currency" name="currency" aria-label="Currency" class="col-start-1 row-start-1 w-full appearance-none rounded-md py-1.5 pr-7 pl-3 text-base text-gray-500 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
          <option>GBP</option>
        </select>
        <svg class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon">
          <path fill-rule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
        </svg>
      </div>
    </div>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">Stock</dt>
            <input 
              type="text"
              className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0 border border-gray-300 rounded-md p-2"
              value={newProduct.stock || ''}  // ✅ Ensures it doesn't crash on undefined values
              onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}  // ✅ Updates state on change
            />
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">Tag</dt>
            <AdminUpdateOrderSelect 
                    options={[
                        { value: "sale", label: "Sale", icon: <FaCircle className="text-red-600" /> },
                        { value: "new", label: "New", icon: <FaCircle className="text-green-600" /> },
                        { value: "popular", label: "Popular", icon: <FaCircle className="text-green-600" /> },
                        { value: "limited", label: "Limited", icon: <FaCircle className="text-yellow-600" /> },
                        { value: "none", label: "None", icon: <FaCircle className="bg-black-600 text-black-600" /> }
                    ]}
                    selected={newProduct.tag || ''} 
                    setSelected={(value) => setNewProduct({ ...newProduct, tag: value })}
                />
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">Category</dt>
            <input 
              type="text"
              className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0 border border-gray-300 rounded-md p-2"
              value={newProduct.category || ''}  // ✅ Ensures it doesn't crash on undefined values
              onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}  // ✅ Updates state on change
              placeholder="marvel, football, squid game, basketball, military, etc."
            />
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">Accessories</dt>
            <input 
              type="text"
              className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0 border border-gray-300 rounded-md p-2"
              placeholder="accessory1, accessory2 & accessory3"
              value={newProduct.accessories || ''}  // ✅ Ensures it doesn't crash on undefined values
              onChange={(e) => setNewProduct({ ...newProduct, accessories: e.target.value })}  // ✅ Updates state on change
            />
          </div>
          
        </dl>
      </div>
      <button onClick={() => addProduct()} className="w-full bg-indigo-600 p-2 rounded-md text-white hover:bg-indigo-700 cursor-pointer transition-all">Confirm</button>
    </div>
    </>
          </>
      ):ImageSection ? (
        <>
        <AdminImageSection product={seletedProduct} handleImageBack={handleImageBack} />
        </>
      ):(
        <>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div className="p-4 rounded-lg border border-[#e9ebee] flex items-center gap-4 bg-white">
        <div className="p-3 rounded-md bg-[#e9ebee]">
            <AiOutlineProduct className="w-6 h-6" />
        </div>
        <div>
            <h3 className="text-sm font-semibold text-gray-600">Total Stock</h3>
            <p className="text-2xl font-bold text-gray-900">{totalStock}</p>
        </div>
        </div>

        <div className="p-4 rounded-lg border border-[#e9ebee] flex items-center gap-4 bg-white">
        <div className="p-3 rounded-md bg-[#e9ebee]">
            <CiCalendarDate className="w-6 h-6" />
        </div>
        <div>
            <h3 className="text-sm font-semibold text-gray-600">Recent Products</h3>
            <p className="text-2xl font-bold text-gray-900">{itemsLast7Days}</p>
        </div>
        </div>

        <div className="p-4 rounded-lg border border-[#e9ebee] flex items-center gap-4 bg-white">
        <div className="p-3 rounded-md bg-[#e9ebee]">
            <TbShoppingCartCancel className="w-6 h-6" />
        </div>
        <div>
            <h3 className="text-sm font-semibold text-gray-600">Out of Stock</h3>
            <p className="text-2xl font-bold text-gray-900">{outOfStock}</p>
        </div>
        </div>

        <div className="p-4 rounded-lg border border-[#e9ebee] flex items-center gap-4 bg-white">
        <div className="p-3 rounded-md bg-[#e9ebee]">
            <TbLego className="w-6 h-6" />
        </div>
        <div>
            <h3 className="text-sm font-semibold text-gray-600">Total Products</h3>
            <p className="text-2xl font-bold text-gray-900">{totalProducts}</p>
        </div>
        </div>
      </div>
      
      {/* Inventory Table */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold mb-4">Product Inventory</h2>
        <div>
        <button className="px-4 py-2 rounded-md border mb-4 border-[#e9ebee] cursor-pointer hover:bg-gray-50">Filter</button>
        <button onClick={() => openAddProduct()} className="px-4 py-2 rounded-md border mb-4 border-[#e9ebee] ml-2 cursor-pointer hover:bg-gray-50">Add Product</button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white text-left text-sm text-gray-700">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs font-semibold">
            <tr>
              <th className="px-6 py-3 border-b border-[#e9ebee]">Product</th>
              <th className="px-6 py-3 border-b border-[#e9ebee]">Category</th>
              <th className="px-6 py-3 border-b border-[#e9ebee]">Price</th>
              <th className="px-6 py-3 border-b border-[#e9ebee]">Stock</th>
              <th className="px-6 py-3 border-b border-[#e9ebee]">Actions</th>
              <th className="px-6 py-3 border-b border-[#e9ebee]">Active</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product, i) => (
                    <tr key={i} className={`hover:bg-gray-50 transition ${product.stock === 0 ? 'bg-red-50' : ''}`}>
                    <td className="px-6 py-4 border-b border-[#e9ebee] flex items-center gap-3">
                    <img className="w-10 h-10 object-cover rounded" src={product?.images[0]?.url ? product?.images[0]?.url : ''} alt={product.name} />
                    <span className="text-gray-700 font-medium">{product.name}</span>
                  </td>
                  <td className="px-6 py-4 border-b border-[#e9ebee]">{product.category || "N/A"}</td>
                  <td className="px-6 py-4 border-b border-[#e9ebee]">£{(product?.price)}</td>
                  <td className="px-6 py-4 border-b border-[#e9ebee]">{product.stock}</td>
                  <td className="px-6 py-4 border-b border-[#e9ebee]">
                    <span onClick={(() => setEditProduct(product))} className="text-indigo-600 cursor-pointer hover:text-indigo-700">Edit</span>
                    <span onClick={() => handleImageSection(product)} className="ml-3 text-green-600 cursor-pointer hover:text-green-700">Images</span>
                    <span onClick={() => openDeleteModal(product)} className="ml-3 text-red-600 cursor-pointer hover:text-red-700">Delete</span>
                  </td>
                  <td className="px-6 py-4 border-b border-[#e9ebee]">
                  <input type="checkbox" checked={product?.active} onChange={() => handleProductActiveChange(product?.id, !product?.active)}/>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center px-6 py-4 border-b border-[#e9ebee]">
                  No products available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
        </>
      )}
      
    </div>
  );
};

export default AdminInventory;