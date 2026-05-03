export const users=[{email:'admin@tapngo.com',password:'admin123',role:'Admin',name:'Admin User'},{email:'cashier@tapngo.com',password:'cashier123',role:'Cashier',name:'Cashier User'}];
export let products=[
{id:'P-1001',name:'Milk 1L',sku:'8901001',category:'Dairy',price:250,stock:42,minStock:10},
{id:'P-1002',name:'Bread',sku:'8901002',category:'Bakery',price:180,stock:31,minStock:8},
{id:'P-1003',name:'Rice 5KG',sku:'8901003',category:'Grocery',price:1450,stock:18,minStock:5},
{id:'P-1004',name:'Shampoo',sku:'8901004',category:'Personal Care',price:620,stock:7,minStock:10},
{id:'P-1005',name:'Tea Pack',sku:'8901005',category:'Grocery',price:850,stock:20,minStock:6}
];
export let sales=[{id:'S-001',date:'2026-05-03',items:[{productId:'P-1001',qty:2,price:250},{productId:'P-1002',qty:1,price:180}],total:680,cashier:'Cashier User'}];
export function createSale(items,cashier='Cashier User'){
 const clean=items.map(i=>{const p=products.find(x=>x.id===i.productId||x.sku===i.sku);return p?{productId:p.id,qty:Number(i.qty||1),price:p.price}:null}).filter(Boolean);
 clean.forEach(i=>{const p=products.find(x=>x.id===i.productId); if(p) p.stock=Math.max(0,p.stock-i.qty)});
 const total=clean.reduce((s,i)=>s+i.qty*i.price,0);
 const sale={id:`S-${String(sales.length+1).padStart(3,'0')}`,date:new Date().toISOString().slice(0,10),items:clean,total,cashier}; sales.unshift(sale); return sale;
}
export function dashboard(){const totalSales=sales.reduce((s,x)=>s+x.total,0);const lowStock=products.filter(p=>p.stock<=p.minStock);const categories=[...new Set(products.map(p=>p.category))].map(category=>({category,count:products.filter(p=>p.category===category).length,stock:products.filter(p=>p.category===category).reduce((s,p)=>s+p.stock,0)}));return{products:products.length,totalSales,transactions:sales.length,lowStock:lowStock.length,categories,recentSales:sales.slice(0,5),trend:[3200,4100,3600,5900,4500,totalSales||680]}}
