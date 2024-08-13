// import FlyingButton from 'react-flying-item'
// import pizza from '@/public/pizza.png'

export default function AddToCartButton({
    hasSizesOrExtras, onClick, price
}) {
    // if (!hasSizesOrExtras) {
    //     return (
    //         <FlyingButton src={pizza}>fly</FlyingButton>
    //     )
    // }

    return (
        <button 
           type='button'
           onClick={onClick}
           className="bg-primary border-0 mt-4 text-white rounded-full px-6 py-2"
        >  
            {hasSizesOrExtras ? (
                <span>From ${price}</span> 
            ) : (
            <span>Add to cart ${price}</span>
            )}
        </button>
    )
}