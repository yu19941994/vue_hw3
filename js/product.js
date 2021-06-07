const app = Vue.createApp({
  data() {
    return {
      url: `https://vue3-course-api.hexschool.io`,
      path: `uy_neish`,
      products: [],
      content: ''
    }
  },
  methods: {
    init() {
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)myToken\s*\=\s*([^;]*).*$)|^.*$/, "$1")
      // console.log(token)
      axios.defaults.headers.common['Authorization'] = token
    },
    getProduct () {
      // let vm = this
      axios.get(`${this.url}/api/${this.path}/admin/products`)
        .then(res => {
          // console.log(res.data.products)
          if (res.data.success) {
            this.products = res.data.products
            console.log(res.data.products)
            console.log(this.products)
            // this.renderProduct(this.product)
            // this.renderProduct(this.product)
          }
        })
        .catch(err => console.log(err))
    },
    // renderProduct (product) {
    //   this.content = ''
    //   product.forEach(item => {
    //     this.content += `
    //       <tr>
    //         <td>${item.category}</td>
    //         <td>${item.title}</td>
    //         <td width="120">
    //           ${item.origin_price}
    //         </td>
    //         <td width="120">
    //           ${item.price}
    //         </td>
    //         <td width="100">
    //           ${item.is_enabled? `<span class="text-success">啟用</span>`: `<span v-else>未啟用</span>`}
            
    //         </td>
    //         <td width="120">
    //           <button type="button" class="btn btn-outline-primary btn-sm" data-id="${item.id}" @click="openProductModal">
    //             編輯
    //           </button>
    //           <button type="button" class="btn btn-sm btn-outline-danger move deleteBtn" data-action="remove"
    //             data-id="${item.id}" @click="deleteProductModal"> 刪除 </button>
    //         </td>
    //       </tr>
    //     `
    //     this.$refs.productList.innerHTML = this.content
    //   })
    //   productCount.innerHTML = this.data.product.length
    //   // productList.addEventListener('click', app.deleteSingleProduct)
    // },
    openProductModal () {
      $('#productModal').modal('show')
    },
    deleteProductModal () {
      $('#delProductModal').modal('show')
    }
  },
  created () {
    this.init()
    this.getProduct()
  } 
})

app.mount('#app')