export const navOptions = [
    {
        id: 'home',
        label: 'Home',
        path: '/'
    },
    {
        id: 'listing',
        label: 'All Products',
        path: '/product/all-products'
    },
    {
        id: 'listingMen',
        label: 'Men',
        path: '/product/men'
    },
    {
        id: 'listingWomen',
        label: 'Women',
        path: '/product/women'
    },
    {
        id: 'listingKids',
        label: 'Kids',
        path: '/product/kids'
    }
]

export const adminNavOptions = [
    {
        id: 'adminListing',
        label: 'Manage All Products',
        path: '/admin-view/all-products'
    },
    {
        id: 'adminNewProduct',
        label: 'Add New Product',
        path: '/admin-view/add-product'
    }
]

export const registrationFormControls = [
    {
        id: 'name',
        type: 'text',
        placeholder: 'Enter your name',
        label: 'Name',
        componnentType: 'input'
    },
    {
        id: 'email',
        type: 'email',
        placeholder: 'Enter your email',
        label: 'Email',
        componnentType: 'input'
    },
    {
        id: 'password',
        type: 'password',
        placeholder: 'Enter your password',
        label: 'Password',
        componnentType: 'input'
    },
    {
        id: 'role',
        type: '',
        placeholder: '',
        label: 'Role',
        componnentType: 'select',
        options: [
            {
                id: 'admin',
                label: 'Admin'
            },
            {
                id: 'customer',
                label: 'Customer'
            }
        ]
    }
]

export const loginFromControls = [
    {
        id: 'email',
        type: 'email',
        placeholder: 'Enter your email',
        label: 'Email',
        componnentType: 'input'
    },
    {
        id: 'password',
        type: 'password',
        placeholder: 'Enter your password',
        label: 'Password',
        componnentType: 'input'
    }
]

export const adminAddPorductFormControls = [
    {
        id: 'name',
        type: 'text',
        placeholder: 'Product Name',
        label: 'Name',
        componnentType: 'input'
    },
    {
        id: 'price',
        type: 'number',
        placeholder: 'Product price',
        label: 'Price',
        componnentType: 'input'
    },
    {
        id: 'description',
        type: 'text',
        placeholder: 'Product Description',
        label: 'Description',
        componnentType: 'input'
    },
    {
        id: 'category',
        type: '',
        placeholder: '',
        label: 'Category',
        componnentType: 'select',
        options: [
            {
                id: 'men',
                label: 'Men'
            },
            {
                id: 'women',
                label: 'Women'
            },
            {
                id: 'kids',
                label: 'Kids'
            }
        ]
    },
    {
        id: 'deliveryInfo',
        type: 'text',
        placeholder: 'Enter delivery info',
        label: 'Delivery Info',
        componnentType: 'input'
    },
    {
        id: 'onSale',
        type: '',
        placeholder: '',
        label: 'On Sale',
        componnentType: 'select',
        options: [
            {
                id: 'yes',
                label: 'Yes'
            },
            {
                id: 'no',
                label: 'No'
            }
        ]
    },
    {
        id: 'priceDrop',
        type: 'number',
        placeholder: 'Enter Price Drop',
        label: 'Price Drop',
        componnentType: 'input'
    },
]

export const availableSizes = [
    {
        id: 's',
        label: 'S'
    },
    {
        id: 'm',
        label: 'M'
    },
    {
        id: 'l',
        label: 'L'
    }
]

export const firebaseConfig = {
    apiKey: process.env.FIREBASE_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID
}

export const firebaseStorageUrl = process.env.storageUrl

export const addNewAddressFormControls = [
    {
        id: 'fullName',
        type: 'input',
        placeholder: 'Enter Name for this address',
        label: 'Address Name',
        componnentType: 'input'
    },
    {
        id: 'Address',
        type: 'input',
        placeholder: 'Enter your address here',
        label: 'Address',
        componnentType: 'input'
    },
    {
        id: 'city',
        type: 'input',
        placeholder: 'City Name',
        label: 'City',
        componnentType: 'input'
    },
    {
        id: 'country',
        type: 'input',
        placeholder: 'Country name',
        label: 'Country',
        componnentType: 'input'
    },
    {
        id: 'postalCode',
        type: 'input',
        placeholder: 'Enter your postal code here',
        label: 'Postal Code',
        componnentType: 'input'
    }
]