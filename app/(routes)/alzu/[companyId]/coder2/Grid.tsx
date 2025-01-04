import React, { FC } from 'react';

type GridProps = {
    columns: number;
    children : React.ReactElement;
};

function Grid({ children, columns }:GridProps) {
    return (
        <div
            // style={{
            //     display: 'grid',
            //     gridTemplateColumns: `repeat(${columns}, 1fr)`,
            //     gridGap: 10,
            //     maxWidth: '800px',
            //     margin: '100px auto',
            // }}
            // className='relative w-full max-w-screen-lg aspect-[9/16] bg-gray-200 border shadow-md overflow-hidden'
        >
            {children}
        </div>
    );
};

export default Grid;