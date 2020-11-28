import React from 'react';
import Modal from 'react-modal';

const link = `https://picsum.photos/v2/list`
Modal.setAppElement('#root');

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        //backgroundColor: 'white',

        // height: 'auto',
        // maxHeight: '80vh',
        // width: 'auto'
    },

    overlay: {
        backgroundColor: 'rgba(191, 191, 191, 0.5)',
    }
};

export default class Pictures extends React.Component {
    state = {
        data: [],
        showModal: false,
        el: {}
    }

    componentDidMount() {
        this.find().then(data => {
            this.setState({ data })
        })
    }

    find = () => {
        return fetch(link, {
            method: 'GET',
        }).then((response) => response.json())
    }

    handleOpenModal = (el) => {
        this.setState({ showModal: true, el });
    }

    handleCloseModal = () => {
        this.setState({ showModal: false });
    }

    render() {
        return <div>
            <div className="container">{this.state.data.map(el => <div key={el.id}
                onClick={() => this.handleOpenModal(el)}
            >
                <img src={el.download_url} height="200px" width="auto" />
            </div>)}
            </div>

            <Modal
                isOpen={this.state.showModal}
                onRequestClose={this.handleCloseModal}
                style={customStyles}
                closeTimeoutMS={200}
            >
                <img src={this.state.el.download_url} loading="lazy" />
            </Modal>
        </div>;
    }
}