const Footer = () => {
  return (
    <footer className="bg-black text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold">MeuSite</h3>
            <p className="text-gray-400">Desenvolvedor Front End</p>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">&copy; 2025 Davyd Fontoura Camargo. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer