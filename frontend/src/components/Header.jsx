import '../css/header.css'
const Header = () =>{
    return(
    <header className='header'>
        <h1>
            DNS
        </h1>
        <p>
        Ищете идеальный подарок? 
        <br />
        С приближением праздников мы знаем, 
        <br />
        как сложно выбрать подарок среди огромного ассортимента. 
        <br />
        Поэтому мы создали сервис, который сделает это за вас!
        </p>
        <button>
            <a href="#question">Подобрать подарок</a>
        </button>
    </header>
    )
}

export default Header