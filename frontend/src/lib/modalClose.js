const modalClose = (e,ref , navigate) => {
    if (e.target === ref.current) {
        navigate('/')
    }
}

export default modalClose;