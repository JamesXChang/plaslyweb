import React from 'react';
import SortBlock from 'components/Home/SortBlock.jsx';
import { Row } from 'reactstrap';

class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Row>{
                blockArr.map( block => 
                    <SortBlock key={ block.id } block={ block }></SortBlock> 
                )
            }
            </Row>
        );
    }
}

const blockArr = [
    {
        id: 0, 
        bgImg: ['images/promotion-bg.png', 'images/appliances-bg.jpg'], 
        title: ['促銷原物料專區', '家用電器'], 
        likeIcon: [false, true],
        color: ['#000', '#000'],
    }, { 
        id: 1, 
        bgImg: 'images/wire-bg.jpg', 
        title: '線材/管材', 
        likeIcon: true,
        color: '#000',
    }, { 
        id: 2, 
        bgImg: 'images/shoes-bg.jpg', 
        title: '鞋材', 
        likeIcon: true,
        color: '#fff',
    }, { 
        id: 3, 
        bgImg: 'images/glasses-bg.jpg', 
        title: '鏡片/鏡框', 
        likeIcon: true,
        color: '#000',
    }, { 
        id: 4, 
        bgImg: 'images/necessities-bg.jpg', 
        title: '家用品', 
        likeIcon: true,
        color: '#000',
    }, { 
        id: 5, 
        bgImg: ['images/car-bg.jpg', 'images/phone-case-bg.jpg'], 
        title: ['汽車零件', '手機殼'], 
        likeIcon: [true, true],
        color: ['#fff', '000'],
    },
]

export default Home;