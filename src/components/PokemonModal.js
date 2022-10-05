function PokemonModal({ setIsOpen, name }) {
  return (
    <div className="blurred-bg" onClick={() => setIsOpen(false)}>
      <div className="modal">
        <h2>{name}</h2>
      </div>
    </div>
  );
}

export default PokemonModal;
