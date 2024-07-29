<template>
	<view>
		{{ Id }}
	</view>
</template>

<script>
export default {
	data() {
		return {
			Id: '',
			data: {}
		};
	},
	onLoad(option) {
		let { id } = option;
		this.Id = id;
		this.start();
	},
	methods: {
		start() {
			let data = { pageNum: 1, numPerPage: 999, orderField: '', orderDirection: '', cusName: '', plate: '', waitDo: -1, state: -1, Id: this.Id, cusId: '' };
			this.apix('CarRental/GetCarSOOrders', data).then((rv) => {
				console.log(rv.Data.Dtos);
				this.data = rv.Data.Dtos[0];
				cosnole.log(this.data);
			});
		}
	}
};
</script>

<style lang="scss"></style>
