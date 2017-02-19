new Vue({
	el:'.container',
	data:{
		addressList:[],
		limitNum:3,
		currentIndex:0,
		shippingMethods:1
		
	},
	mounted:function(){
		this.$nextTick(function(){
			this.getAddresslist()
		})
	},
	computed:{
		filterAddress:function(){
			return this.addressList.slice(0,this.limitNum)
		}
	},
	methods:{
		getAddresslist:function(){
			var _this= this;
			this.$http.get("data/address.json").then(function(respones){
				var res = respones.data;
				if(res.status == 0){
					_this.addressList = res.result;
				}
			})
		},
		setDefault:function(item){
			this.addressList.forEach(function(val,index){
				if(item.addressId==val.addressId){
					val.isDefault = true;
				}else{
					val.isDefault = false;
				}
				
			})
			
		
		}
	}
})
