'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, ChevronDown, Shield, Clock, MapPin, Star, ArrowRight, Car, Handshake, CreditCard } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import api from '@/lib/api';
import { getPlaceholderImage } from '@/lib/placeholders';

interface VeiculoDestaque {
  id: number;
  marca: string;
  modelo: string;
  ano: number;
  valor: number;
  tipo: string;
  combustivel: string;
  km: number;
  foto1: string;
  loja_nome: string;
  estande: string;
  visualizacoes: number;
}

const parceiros = [
  { nome: '3R Multimarcas', logo: '/parceiro-3rmultimarcas.jpeg' },
  { nome: 'Guaçu Veículos', logo: '/parceiro-guacuveiculos.png' },
  { nome: 'Guarnieri Automóveis', logo: '/parceiro-guarnieri.png' },
  { nome: 'Júnnior Veículos', logo: '/parceiro-junnior-veiculos.png' },
  { nome: 'Maveni Veículos', logo: '/parceiro-maveni.png' },
  { nome: 'Rodrigo Veículos', logo: '/parceiro-rodrigoveiculos.jpeg' },
];

export default function Home() {
  const router = useRouter();
  const [veiculosDestaque, setVeiculosDestaque] = useState<VeiculoDestaque[]>([]);
  const [filters, setFilters] = useState({
    marca: '',
    tipo: '',
    min: '',
    max: '',
    ano: '',
    combustivel: '',
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    api.get('/api/veiculos/buscar', { params: { limit: 8 } })
      .then(res => setVeiculosDestaque(res.data.data || []))
      .catch(() => {});
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, value);
    });
    router.push(`/resultado?${params.toString()}`);
  };

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

  return (
    <main className="min-h-screen bg-white">
      {/* ===== HEADER ===== */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0f1923]/95 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 sm:h-[72px]">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/logo-big-feirao.png" alt="Big Feirão" width={44} height={44} className="rounded-full" />
              <span className="hidden sm:block text-white font-bold text-sm tracking-wide">Big Feirão</span>
            </Link>

            <nav className="flex items-center gap-2 sm:gap-3">
              <Link
                href="/lojista/login"
                className="text-sm text-gray-300 hover:text-white px-3 py-2 rounded-lg transition-colors"
              >
                Sou Lojista
              </Link>
              <Link
                href="/admin/login"
                className="text-sm bg-white/10 hover:bg-white/15 text-white px-4 py-2 rounded-lg transition-colors font-medium"
              >
                Admin
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* ===== HERO ===== */}
      <section className="relative pt-16 sm:pt-[72px]">
        <div className="bg-gradient-to-b from-[#0f1923] via-[#0f1923] to-[#1a2d3d] relative overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
          {/* Glow effect */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#e94560]/5 rounded-full blur-[120px]" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-10 pb-16 sm:pt-16 sm:pb-24">
            {/* Logo Big Feirão */}
            <div className="flex justify-center mb-6 sm:mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-[#e94560]/20 rounded-full blur-3xl scale-150" />
                <Image
                  src="/logo-big-feirao.png"
                  alt="Big Feirão"
                  width={180}
                  height={180}
                  className="relative rounded-full shadow-2xl shadow-black/40 sm:w-[220px] sm:h-[220px]"
                  priority
                />
              </div>
            </div>

            <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] mb-4 sm:mb-6">
                Seu próximo carro está{' '}
                <span className="text-[#e94560]">aqui</span>
              </h1>
              <p className="text-base sm:text-lg text-gray-400 max-w-xl mx-auto leading-relaxed">
                Centenas de veículos selecionados pelas melhores lojas da região.
                Compare preços, visite o estande e saia dirigindo.
              </p>
            </div>

            {/* ===== SEARCH BOX ===== */}
            <div className="max-w-3xl mx-auto">
              <form onSubmit={handleSearch}>
                <div className="bg-white rounded-2xl shadow-2xl shadow-black/20 p-1.5">
                  {/* Main search row */}
                  <div className="flex">
                    <div className="flex-1 relative">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Buscar marca ou modelo..."
                        value={filters.marca}
                        onChange={(e) => setFilters({ ...filters, marca: e.target.value })}
                        className="w-full pl-12 pr-4 py-4 text-base sm:text-lg rounded-xl bg-transparent focus:outline-none text-gray-900 placeholder:text-gray-400"
                      />
                    </div>
                    <button
                      type="submit"
                      className="bg-[#e94560] hover:bg-[#d63351] text-white px-6 sm:px-10 py-4 rounded-xl font-bold text-base transition-colors shrink-0"
                    >
                      <span className="hidden sm:inline">Buscar</span>
                      <Search className="w-5 h-5 sm:hidden" />
                    </button>
                  </div>

                  {/* Toggle filters */}
                  <button
                    type="button"
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 px-4 py-2 transition-colors"
                  >
                    <span>Filtros avançados</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Expanded filters */}
                  {showFilters && (
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 px-2 pb-3 pt-1">
                      <select
                        value={filters.tipo}
                        onChange={(e) => setFilters({ ...filters, tipo: e.target.value })}
                        className="px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-[#e94560] bg-gray-50"
                      >
                        <option value="">Tipo</option>
                        <option value="SUV">SUV</option>
                        <option value="Sedan">Sedan</option>
                        <option value="Hatch">Hatch</option>
                        <option value="Pickup">Pickup</option>
                        <option value="Caminhonete">Caminhonete</option>
                        <option value="Van">Van</option>
                      </select>
                      <select
                        value={filters.combustivel}
                        onChange={(e) => setFilters({ ...filters, combustivel: e.target.value })}
                        className="px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-[#e94560] bg-gray-50"
                      >
                        <option value="">Combustível</option>
                        <option value="Gasolina">Gasolina</option>
                        <option value="Flex">Flex</option>
                        <option value="Diesel">Diesel</option>
                        <option value="Eletrico">Elétrico</option>
                      </select>
                      <input
                        type="number"
                        placeholder="Preço mín."
                        value={filters.min}
                        onChange={(e) => setFilters({ ...filters, min: e.target.value })}
                        className="px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-[#e94560] bg-gray-50"
                      />
                      <input
                        type="number"
                        placeholder="Preço máx."
                        value={filters.max}
                        onChange={(e) => setFilters({ ...filters, max: e.target.value })}
                        className="px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-[#e94560] bg-gray-50"
                      />
                      <input
                        type="number"
                        placeholder="Ano mín."
                        value={filters.ano}
                        onChange={(e) => setFilters({ ...filters, ano: e.target.value })}
                        className="px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-[#e94560] bg-gray-50"
                      />
                    </div>
                  )}
                </div>
              </form>
            </div>

            {/* Banco BV badge in hero */}
            <div className="flex items-center justify-center mt-8 gap-2">
              <span className="text-xs text-gray-500 uppercase tracking-wider">Financiamento por</span>
              <Image src="/bv-branco.png" alt="Banco BV" width={60} height={24} className="opacity-70" />
            </div>
          </div>
        </div>
      </section>

      {/* ===== TRUST BAR ===== */}
      <section className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                <Shield className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">Lojas verificadas</p>
                <p className="text-xs text-gray-500">100% confiáveis</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">Ofertas exclusivas</p>
                <p className="text-xs text-gray-500">Preços do feirão</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">Visite o estande</p>
                <p className="text-xs text-gray-500">Localização exata</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center shrink-0">
                <Star className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">Financiamento</p>
                <p className="text-xs text-gray-500">Parceiro Banco BV</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURED VEHICLES ===== */}
      {veiculosDestaque.length > 0 && (
        <section className="py-12 sm:py-20 bg-[#f8f9fb]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-end justify-between mb-8 sm:mb-10">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Destaques do feirão</h2>
                <p className="text-gray-500 mt-1 text-sm sm:text-base">Veículos selecionados para você</p>
              </div>
              <Link
                href="/resultado"
                className="hidden sm:flex items-center gap-1.5 text-[#e94560] hover:text-[#d63351] font-semibold text-sm transition-colors"
              >
                Ver todos
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              {veiculosDestaque.slice(0, 8).map((v) => {
                const fotoUrl = v.foto1
                  ? (v.foto1.startsWith('http') ? v.foto1 : `${apiUrl}${v.foto1}`)
                  : getPlaceholderImage(v.id);
                return (
                  <Link
                    key={v.id}
                    href={`/veiculo/${v.id}`}
                    className="group bg-white rounded-xl overflow-hidden border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-200"
                  >
                    <div className="aspect-[4/3] bg-gray-100 overflow-hidden relative">
                      <img
                        src={fotoUrl}
                        alt={`${v.marca} ${v.modelo}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-3 left-3 bg-[#0f1923]/80 text-white text-[11px] font-semibold px-2.5 py-1 rounded-md backdrop-blur-sm">
                        {v.tipo}
                      </span>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 truncate">
                        {v.marca} {v.modelo}
                      </h3>
                      <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                        <span>{v.ano}</span>
                        <span className="w-1 h-1 rounded-full bg-gray-300" />
                        <span>{v.km.toLocaleString('pt-BR')} km</span>
                        <span className="w-1 h-1 rounded-full bg-gray-300" />
                        <span>{v.combustivel}</span>
                      </div>
                      <p className="text-lg font-bold text-[#e94560] mt-3">
                        R$ {v.valor.toLocaleString('pt-BR')}
                      </p>
                      <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-gray-100 text-xs text-gray-500">
                        <MapPin className="w-3.5 h-3.5" />
                        <span className="truncate">{v.loja_nome}</span>
                        <span className="mx-1">|</span>
                        <span className="truncate font-medium text-gray-700">{v.estande}</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            <div className="sm:hidden mt-6 text-center">
              <Link
                href="/resultado"
                className="inline-flex items-center gap-2 bg-[#0f1923] text-white px-6 py-3 rounded-xl font-semibold text-sm"
              >
                Ver todos os veículos
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ===== LOJAS PARCEIRAS ===== */}
      <section className="py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-2 bg-[#e94560]/10 text-[#e94560] text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
              <Handshake className="w-4 h-4" />
              Parceiros
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Lojas participantes</h2>
            <p className="text-gray-500 mt-2 text-sm sm:text-base max-w-lg mx-auto">
              As melhores lojas da região reunidas em um só lugar
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
            {parceiros.map((p) => (
              <div
                key={p.nome}
                className="group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-[#e94560]/30 hover:shadow-lg hover:shadow-[#e94560]/5 transition-all duration-300"
              >
                <div className="aspect-square bg-gray-50 flex items-center justify-center p-4 overflow-hidden">
                  <Image
                    src={p.logo}
                    alt={p.nome}
                    width={200}
                    height={200}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300 rounded-lg"
                  />
                </div>
                <div className="px-3 py-2.5 border-t border-gray-100 bg-white">
                  <p className="text-xs sm:text-sm font-medium text-gray-700 text-center leading-tight truncate">{p.nome}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FINANCIAMENTO - BANCO BV ===== */}
      <section className="py-12 sm:py-20 bg-gradient-to-br from-[#003087] to-[#001f5c] relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
            {/* Left side - Content */}
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-white/10 text-white/80 text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-6">
                <CreditCard className="w-4 h-4" />
                Financiamento
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight mb-4">
                Financie seu veículo com as{' '}
                <span className="text-[#00d4aa]">melhores taxas</span>
              </h2>
              <p className="text-base sm:text-lg text-blue-100/80 max-w-lg mx-auto lg:mx-0 leading-relaxed mb-8">
                O Banco BV é nosso parceiro oficial de financiamento. Simule na hora, com aprovação rápida e condições especiais exclusivas do feirão.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <div className="flex items-center gap-3 text-white/90">
                  <div className="w-8 h-8 rounded-full bg-[#00d4aa]/20 flex items-center justify-center">
                    <span className="text-[#00d4aa] text-sm font-bold">1</span>
                  </div>
                  <span className="text-sm">Taxas a partir de 0,99% a.m.</span>
                </div>
                <div className="flex items-center gap-3 text-white/90">
                  <div className="w-8 h-8 rounded-full bg-[#00d4aa]/20 flex items-center justify-center">
                    <span className="text-[#00d4aa] text-sm font-bold">2</span>
                  </div>
                  <span className="text-sm">Aprovação em minutos</span>
                </div>
                <div className="flex items-center gap-3 text-white/90">
                  <div className="w-8 h-8 rounded-full bg-[#00d4aa]/20 flex items-center justify-center">
                    <span className="text-[#00d4aa] text-sm font-bold">3</span>
                  </div>
                  <span className="text-sm">Até 60x no boleto</span>
                </div>
              </div>
            </div>

            {/* Right side - BV Logo */}
            <div className="shrink-0">
              <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-2xl shadow-black/20">
                <Image
                  src="/bv-azul.png"
                  alt="Banco BV - Parceiro Oficial"
                  width={200}
                  height={80}
                  className="w-[160px] sm:w-[200px] h-auto"
                />
                <p className="text-center text-xs text-gray-400 mt-4 font-medium uppercase tracking-wider">Parceiro oficial</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="py-12 sm:py-20 bg-[#f8f9fb]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Como funciona</h2>
            <p className="text-gray-500 mt-2 text-sm sm:text-base">Simples, rápido e seguro</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12">
            <div className="text-center">
              <div className="w-14 h-14 bg-[#e94560]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Search className="w-7 h-7 text-[#e94560]" />
              </div>
              <div className="text-xs font-bold text-[#e94560] mb-2">01</div>
              <h3 className="font-semibold text-gray-900 mb-2">Busque seu carro</h3>
              <p className="text-sm text-gray-500 leading-relaxed max-w-xs mx-auto">
                Use os filtros para encontrar o veículo ideal por marca, preço, tipo e muito mais.
              </p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-7 h-7 text-blue-600" />
              </div>
              <div className="text-xs font-bold text-blue-600 mb-2">02</div>
              <h3 className="font-semibold text-gray-900 mb-2">Visite o estande</h3>
              <p className="text-sm text-gray-500 leading-relaxed max-w-xs mx-auto">
                Cada veículo mostra a localização exata do estande para você ir direto ao ponto.
              </p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Car className="w-7 h-7 text-green-600" />
              </div>
              <div className="text-xs font-bold text-green-600 mb-2">03</div>
              <h3 className="font-semibold text-gray-900 mb-2">Saia dirigindo</h3>
              <p className="text-sm text-gray-500 leading-relaxed max-w-xs mx-auto">
                Negocie direto com a loja, simule o financiamento e feche o melhor negócio.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="py-12 sm:py-16 bg-[#0f1923]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl sm:text-4xl font-extrabold text-white">500+</p>
              <p className="text-sm text-gray-400 mt-1">Veículos disponíveis</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-extrabold text-white">6</p>
              <p className="text-sm text-gray-400 mt-1">Lojas parceiras</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-extrabold text-white">BV</p>
              <p className="text-sm text-gray-400 mt-1">Financiamento oficial</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-extrabold text-[#e94560]">0%</p>
              <p className="text-sm text-gray-400 mt-1">Entrada</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-[#0a1118] text-gray-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Image src="/logo-big-feirao.png" alt="Big Feirão" width={40} height={40} className="rounded-full" />
                <span className="text-white font-bold text-sm">Big Feirão</span>
              </div>
              <p className="text-sm leading-relaxed">
                O maior feirão de veículos da região. Encontre seu próximo carro com as melhores condições.
              </p>
              <div className="flex items-center gap-3 mt-4">
                <span className="text-xs text-gray-500">Financiamento:</span>
                <Image src="/bv-branco.png" alt="Banco BV" width={50} height={20} className="opacity-60" />
              </div>
            </div>

            {/* Lojas Parceiras */}
            <div>
              <h4 className="text-white font-semibold text-sm mb-4">Lojas Parceiras</h4>
              <ul className="space-y-2">
                {parceiros.map((p) => (
                  <li key={p.nome} className="text-sm hover:text-white transition-colors cursor-default">{p.nome}</li>
                ))}
              </ul>
            </div>

            {/* Links */}
            <div>
              <h4 className="text-white font-semibold text-sm mb-4">Acesso</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/resultado" className="text-sm hover:text-white transition-colors">Buscar veículos</Link>
                </li>
                <li>
                  <Link href="/lojista/login" className="text-sm hover:text-white transition-colors">Área do Lojista</Link>
                </li>
                <li>
                  <Link href="/admin/login" className="text-sm hover:text-white transition-colors">Administração</Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-white/10 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-gray-500">2026 Big Feirão. Todos os direitos reservados.</p>
            <div className="flex items-center gap-3">
              {parceiros.map((p) => (
                <div key={p.nome} className="w-7 h-7 rounded bg-white/10 flex items-center justify-center overflow-hidden">
                  <Image
                    src={p.logo}
                    alt={p.nome}
                    width={28}
                    height={28}
                    className="w-full h-full object-contain opacity-50 hover:opacity-80 transition-opacity"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
