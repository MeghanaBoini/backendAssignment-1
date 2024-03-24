//create express module
const exp=require('express')
const app=exp();

//extract body of req
app.use(exp.json())



//example products
let ProductList=[
    {
        productId:1,
        productName:'Smart watch',
        price:3000,
        brand:'fastrack'
    },
    {
        productId:2,
        productName:'IPhone',
        price:150000,
        brand:'Apple'
    },
    {
        productId:3,
        productName:'Washing Machine',
        price:100000,
        brand:'Sony'
    },
    {
        productId:4,
        productName:'laptop',
        price:500000,
        brand:'dell'
    }
]

//get all products
app.get('/Products',(req,res)=>{
    res.send({Products:ProductList})
})


//get a product by id
app.get('/Products/:productId',(req,res)=>{
    let productId=Number(req.params.productId)
    let product=ProductList.find(productObj=>productObj.productId===productId)
    if(product===undefined){
        res.send({message:'Product not found'})
    }else{
        res.send({payload:product})
    }
})


//update product data
app.put('/product',(req,res)=>{
    let ModifiedPro=req.body
    let index=ProductList.findIndex(productObj=>productObj.productId===ModifiedPro.productId)
    if(index===-1){
        res.send({message:"No Product found to modify"})
    }else{
        ProductList.splice(index,1,ModifiedPro)
        res.send({message:'Product modified'})
    }
})




//delete product by id
app.delete('/product/:productId',(req,res)=>{
    let productId=Number(req.params.productId)
    let index=ProductList.findIndex(productObj=>productObj.productId===productId)
    if(index===-1){
        res.send({message:'No product to delete'})
    }else{
        ProductList.splice(index,1)
        res.send({message:'Product deleted'})
    }
})





app.listen(4000,()=>console.log('server running on 4000...'))
