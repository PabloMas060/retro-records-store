/*
const URL_API_SERVER = 'http://localhost:3000';


const btnAddCart = document.querySelector('#btn-addCart') || document.querySelector('.btn-addCart');

if (btnAddCart) {
    btnAddCart.addEventListener('click', async () => {
        const id = btnAddCart.getAttribute('data-id');
        
        try {
            const objAlbumId = { albumId: id };
            
            const response = await fetch(`${URL_API_SERVER}/api/cart/addProduct`, {
                method: "POST",
                body: JSON.stringify(objAlbumId),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const { ok } = await response.json();

            await Swal.fire({
                title: ok ? "Producto agregado a tu Carrito!" : "Lo sentimos, debes iniciar sesión",
                icon: ok ? 'success' : 'warning',
                showConfirmButton: false,
                timer: 1200
            });

            if (!ok) {
                location.href = "/users/login";
            }
        } catch (error) {
            console.error("Error al agregar al carrito:", error);
        }
    });
} else {
    console.warn("El botón de agregar al carrito no se encontró en esta página.");
}
    */