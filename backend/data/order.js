const order = [
    {
        user:{
            name:'adi',
            email:'adi@gmail.com'
        },
        address:{
            state:'haryana',
            city:'yamunanagar',
            pincode:'135003',
            particulars:'#42 ,Sec-17 ,Huda, jagadhri',
            latitude : '33.335556',
            longitude : '77.35447'
        },
        product : [
            {
                _id:'1',
                qty:'4',
                price:'5000',
                totalPrice:'20000'
            },
            {
                _id:'2',
                qty:'2',
                price:'50000',
                totalPrice:'100000'
            },
            {
                _id:'3',
                qty:'1',
                price:'5000',
                totalPrice:'5000'
            },
        ],
        grandTotal: '150000'
    },
    {
        user:{
            name:'ekta',
            email:'ekta@gmail.com'
        },
        address:{
            state:'haryana',
            city:'yamunanagar',
            pincode:'135003',
            particulars:'#4282 ,Sec-17 ,Huda, jagadhri',
            latitude : '33.335556',
            longitude : '77.35447'
        },
        product : [
            {
                _id:'5',
                qty:'4',
                price:'5005',
                totalPrice:'20005'
            },
            {
                _id:'6',
                qty:'2',
                price:'58800',
                totalPrice:'100008'
            },
            {
                _id:'7',
                qty:'1',
                price:'5999',
                totalPrice:'5999'
            },
        ],
        grandTotal: '199999'
    }
]
export default order