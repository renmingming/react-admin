import React from 'react'
import {Card, Row, Col, Modal} from 'antd'

export default class Gallerys extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            showVisible: false,
            currentImg: ''
        }
    }
    openGallery = (src) => {
        this.setState({
            showVisible: true,
            currentImg: '/gallery/'+src
        })
    }
    render() {
        const imgs = [];
        for(let i = 1; i<=25; i=i+5) {
            let arr = [];
            for(let k = i; k<i+5; k++) {
                arr.push(k+'.png')
            }
            imgs.push(arr);
        }
        console.log(imgs)
        // const imgs = [
        //     ['1.png', '2.png', '3.png', '4.png', '5.png'],
        //     ['6.png', '7.png', '8.png', '9.png', '10.png'],
        //     ['11.png', '12.png', '13.png', '14.png', '15.png'],
        //     ['16.png', '17.png', '18.png', '19.png', '20.png'],
        //     ['21.png', '22.png', '23.png', '24.png', '25.png'],
        // ]
        const imgList = imgs.map((list) => {
            return list.map((item,index) => 
                <Card key={index} cover={<img alt="gallery" src={'/gallery/'+item} onClick={() => this.openGallery(item)} />}>
                    <Card.Meta
                        title="React Admin"
                        description="RenMingMing React"
                    />
                </Card>
            )
        })
        return(
            <div>
                    <Row gutter={10}>
                        {
                            imgList.map((item, index) => 
                                <Col md={index === (imgList.length-1) ? 4 : 5} key={index}>
                                    {item}
                                </Col>
                            )
                        }
                    </Row>
                    <Modal
                        title="图片预览"
                        width={'50%'}
                        onCancel={()=>{
                            this.setState({showVisible: false})
                        }}
                        visible={this.state.showVisible}>
                        <img src={this.state.currentImg} style={{width:'100%',objectFit: 'cover', maxHeight: '500px'}} alt="" />
                    </Modal>
            </div>
        )
    }
}