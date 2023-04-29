import * as echarts from 'echarts';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchSingleProduct } from '../../storageToolkit/singleProduct/singleProductSlice';
import { fetchProducts } from '../../storageToolkit/products/productsSlice';

export const Chart = () => {
   const { data: products } = useSelector((state) => state.products);
   // console.log(products);

   const dispatch = useDispatch();

   // const data = products.map((e) => e.reviews.length);
   const dataName = products.map((e) => e.name);
   // console.log(dataName);
   // console.log(data);

   const rateAcc = products.map((e) =>
      Math.floor(e.reviews.reduce((acc, el) => (acc = acc + el.rating), 0) / e.reviews.length)
   );
   // console.log(rateAcc);

   useEffect(() => {
      dispatch(fetchProducts());
   }, [dispatch]);

   useEffect(() => {
      const option = {
         title: {
            text: 'Рейтинг товаров',
         },
         tooltip: {},
         xAxis: {
            data: dataName,
            // data: [5, 20, 36, 50, 55, 20, 8, 20],

            type: 'category',
         },
         yAxis: { type: 'value' },
         series: [
            {
               name: 'sales',
               type: 'bar',
               // data: [5, 20, 36, 50, 55, 20],
               data: rateAcc,
               colorBy: 'sales',
            },
         ],
      };
      const chart = document.getElementById('idChart');
      const myChart = echarts.init(chart);
      option && myChart.setOption(option);
   }, []);

   return (
      <div>
         <div
            id="idChart"
            style={{ width: '700px', height: '600px', marginTop: '20px', marginBottom: '40px' }}
         />
      </div>
   );
};
