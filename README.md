# Rick and Morty Explorer 🚀

## Descripción de la aplicación
Esta aplicación web interactiva permite explorar el multiverso de Rick and Morty. Puedes buscar personajes por su nombre, filtrarlos según su estado (Alive, Dead, Unknown) y ver información detallada de cada uno haciendo clic en su tarjeta. Cuenta con un diseño premium y adaptativo con soporte para modo oscuro, *glassmorphism* y animaciones suaves.

## Tecnologías utilizadas
- **React**: Biblioteca principal para la construcción de interfaces de usuario.
- **TypeScript**: Para garantizar la seguridad de tipos, interfaces para los datos de la API y un código más robusto.
- **Vite**: Herramienta de construcción (bundler) ultrarrápida.
- **CSS3 (Vanilla)**: Sistema de diseño puro utilizando variables CSS, Flexbox, CSS Grid y animaciones sin depender de librerías externas.
- **Git y GitHub**: Para el control de versiones y alojamiento del repositorio.

## Evidencia del uso de useState
Se implementó `useState` tanto en el componente raíz (`App.tsx`) para gestionar el estado de los filtros y el personaje seleccionado, como en el Custom Hook (`useCharacters.ts`) para mantener la lista de personajes devuelta por la API, así como los estados de carga (`loading`) y error (`error`).

Ejemplo en `App.tsx`:
```tsx
const [nameFilter, setNameFilter] = useState('');
const [statusFilter, setStatusFilter] = useState('');
const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
```

Ejemplo en `useCharacters.ts`:
```tsx
const [characters, setCharacters] = useState<Character[]>([]);
const [loading, setLoading] = useState<boolean>(true);
const [error, setError] = useState<string | null>(null);
```

## Evidencia del uso de useEffect
El hook `useEffect` fue utilizado dentro de `useCharacters.ts` para ejecutar el llamado asíncrono a la API (fetch) cada vez que el componente se monta o cuando las dependencias `nameFilter` y `statusFilter` cambian. Además, se implementó un mecanismo de *debounce* (retraso) para no saturar la API con peticiones cada vez que el usuario teclea en el buscador.

Ejemplo en `useCharacters.ts`:
```tsx
useEffect(() => {
  // Lógica de fetch a la API
  // ...

  const timeoutId = setTimeout(() => {
    fetchCharacters();
  }, 500);

  return () => clearTimeout(timeoutId); // Limpieza (Cleanup) del efecto
}, [nameFilter, statusFilter]);
```

## Conclusiones personales sobre el desarrollo del taller

Durante el desarrollo de esta aplicación, pude comprender a fondo cómo los hooks `useState` y `useEffect` interactúan para gestionar datos provenientes de fuentes externas. Además, la separación de responsabilidades a través de componentes reutilizables y *custom hooks* permitió mantener el código ordenado y fácil de escalar. La implementación de un diseño moderno y responsivo con CSS también reforzó las mejores prácticas de UI/UX.
