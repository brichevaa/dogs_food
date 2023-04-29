import { Pagination } from 'antd';

export const PaginationMain = () => {
   return (
      <div className="pagination">
         <Pagination defaultCurrent={1} total={50} defaultPageSize={10} pageSize={10} />
      </div>
   );
};
