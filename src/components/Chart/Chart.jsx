import * as echarts from 'echarts';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../storageToolkit/products/productsSlice';
import { useContext } from 'react';
import { UserContext } from '../../context/userContext';
import { useNavigate } from 'react-router-dom';

export const Chart = () => {
   const { searchRequest } = useContext(UserContext);
   const { data: products } = useSelector((state) => state.products);

   const navigate = useNavigate();

   if (searchRequest) {
      navigate('/catalog');
   }

   const dispatch = useDispatch();

   const dataName = products.map((e) => e.name);

   const rateAcc = products.map((e) =>
      Math.floor(e.reviews.reduce((acc, el) => (acc = acc + el.rating), 0) / e.reviews.length)
   );

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
