export default function InfoBox({children, bgcolor = 'bg-blue-200'}) {
    return (
        <div className={`${bgcolor} text-center p-2 rounded-lg`}>
            {children}
        </div>
    )
}