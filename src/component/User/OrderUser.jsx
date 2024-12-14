import usefbStore from "../../Store/store"


const OrderUser = () => {
    const getOrderUser = usefbStore((state) => state.getOrderUser)

    return (
        <div onClick={() => getOrderUser()}>OrderUser</div>
    )
}

export default OrderUser