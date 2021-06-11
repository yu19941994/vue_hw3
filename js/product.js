import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.11/vue.esm-browser.js'


let productModal = {}
let delProductModal = {}
const app = createApp({
  data() {
    return {
      url: `https://vue3-course-api.hexschool.io`,
      path: `uy_neish`,
      products: [],
      content: '',
      image: '',
      tempProduct: {
        // imagesUrl: []
      },
      isNew: false
    }
  },
  methods: {
    init() {
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)myToken\s*\=\s*([^;]*).*$)|^.*$/, "$1")
      // console.log(token)
      axios.defaults.headers.common['Authorization'] = token
    },
    getProduct () {
      axios.get(`${this.url}/api/${this.path}/admin/products`)
        .then(res => {
          if (res.data.success) {
            this.products = res.data.products
          }
        })
        .catch(err => console.log(err))
    },
    openModal (isNew, item) {
      this.isNew = isNew
      if(this.isNew){
        this.tempProduct = {imgUrl: []}
      }else{
        this.tempProduct = {...item} 
      }
      productModal.show()
    },
    createImages () {
      this.tempProduct.imagesUrl = ['']
    },
    updateProduct () {
      let updateUrl = `${this.url}/api/${this.path}/admin/product`
      let method = 'post'
      if(!this.isNew){
        method = 'put'
        updateUrl = `${this.url}/api/${this.path}/admin/product/${this.tempProduct.id}`
      }
      this.tempProduct.origin_price = parseInt(this.tempProduct.origin_price)
      this.tempProduct.price = parseInt(this.tempProduct.price)

      axios[method](updateUrl,{ data: this.tempProduct })
        .then(res => {
          console.log(res)
          if(res.data.success) {
            this.getProduct()
            productModal.hide()
          }
        })
        .catch(err => console.log(err))
    },
    deleteProductModal (item) {
      delProductModal.show()
      this.tempProduct = {...item}
    },
    delProduct () {
      axios.delete(`${this.url}/api/${this.path}/admin/product/${this.tempProduct.id}`)
        .then(res => {
          if(res.data.success) {
            this.getProduct()
            delProductModal.hide()
          }
        })
        .catch(err => console.log(err))
    }
  },
  created () {
    this.init()
    this.getProduct()
  },
  mounted () {
    productModal = new bootstrap.Modal(document.getElementById('productModal'), {
      keyboard: false
    }),
    delProductModal = new bootstrap.Modal(document.getElementById('delProductModal'), {
      keyboard: false
    })
  }
})

app.mount('#app')