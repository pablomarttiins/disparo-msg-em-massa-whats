import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const LandingPageStyles = `
    .hero-gradient {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }
    
    .pulse-animation {
        animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }
    
    @keyframes pulse {
        0%, 100% {
            opacity: 1;
        }
        50% {
            opacity: .7;
        }
    }
    
    .feature-card {
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    
    .feature-card:hover {
        transform: translateY(-8px) scale(1.02);
        box-shadow: 0 20px 40px -12px rgba(59, 130, 246, 0.3);
    }
    
    .testimonial-card {
        transition: transform 0.3s ease;
    }
    
    .testimonial-card:hover {
        transform: scale(1.03);
    }
    
    .pricing-card {
        transition: all 0.4s ease;
        position: relative;
    }
    
    .pricing-card:hover {
        transform: translateY(-10px);
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    }
    
    .pricing-card.popular {
        border: 3px solid #3B82F6;
        transform: scale(1.05);
    }
    
    .popular-badge {
        position: absolute;
        top: -16px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 6px 20px;
        border-radius: 25px;
        font-size: 0.75rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
    }
    
    .stat-number {
        font-size: 3rem;
        font-weight: 900;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }
    
    .cta-glow {
        box-shadow: 0 0 30px rgba(59, 130, 246, 0.5);
        animation: glow 2s ease-in-out infinite;
    }
    
    @keyframes glow {
        0%, 100% {
            box-shadow: 0 0 30px rgba(59, 130, 246, 0.5);
        }
        50% {
            box-shadow: 0 0 40px rgba(59, 130, 246, 0.8);
        }
    }
    
    .trust-badge {
        animation: float 3s ease-in-out infinite;
    }
    
    @keyframes float {
        0%, 100% {
            transform: translateY(0px);
        }
        50% {
            transform: translateY(-10px);
        }
    }
`;

const LandingPage: React.FC = () => {
  useEffect(() => {
    // Smooth scroll
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const id = target.getAttribute('href')?.substring(1);
        const element = document.getElementById(id || '');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  return (
    <>
      <style>{LandingPageStyles}</style>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />

      <div className="font-sans bg-white">
        {/* Top Banner */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 text-center text-sm font-semibold">
          🎉 Oferta Especial: 30 dias grátis no plano Profissional para novos usuários! <span className="underline cursor-pointer">Aproveite agora →</span>
        </div>
        
        {/* Header */}
        <header className="bg-white shadow-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl mr-3">WC</div>
              <span className="text-xl font-bold text-gray-900">WhatsCampaign</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#beneficios" className="text-gray-600 hover:text-blue-600 font-medium transition">Benefícios</a>
              <a href="#como-funciona" className="text-gray-600 hover:text-blue-600 font-medium transition">Como Funciona</a>
              <a href="#casos" className="text-gray-600 hover:text-blue-600 font-medium transition">Casos de Sucesso</a>
              <a href="#precos" className="text-gray-600 hover:text-blue-600 font-medium transition">Preços</a>
            </nav>
            <div className="flex items-center space-x-4">
              <Link to="/login" className="text-gray-600 hover:text-blue-600 font-medium transition">Entrar</Link>
              <Link to="/signup" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300 shadow-lg">Começar Grátis</Link>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="py-20 md:py-28 bg-gradient-to-br from-blue-50 via-purple-50 to-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-blue-100 to-transparent opacity-30"></div>
          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center relative z-10">
            <div className="md:w-1/2 mb-12 md:mb-0">
              <div className="inline-block bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                ✨ Usado por mais de 5.000 empresas
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 leading-tight mb-6">
                Multiplique suas <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">vendas em 300%</span> automatizando o WhatsApp
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-xl leading-relaxed">
                Pare de perder horas enviando mensagens manualmente. Envie <strong>milhares de mensagens personalizadas</strong> em minutos e veja seu faturamento decolar.
              </p>
              
              <div className="space-y-3 mb-8">
                <div className="flex items-center">
                  <i className="fas fa-check-circle text-green-500 text-xl mr-3"></i>
                  <span className="text-lg text-gray-700"><strong>Economize 15h/semana</strong> com automação inteligente</span>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-check-circle text-green-500 text-xl mr-3"></i>
                  <span className="text-lg text-gray-700"><strong>+300% de conversão</strong> com mensagens personalizadas por IA</span>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-check-circle text-green-500 text-xl mr-3"></i>
                  <span className="text-lg text-gray-700"><strong>100% seguro</strong> e em conformidade com WhatsApp Business</span>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
                <Link to="/signup" className="cta-glow bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-5 px-10 rounded-xl text-lg transition duration-300 text-center shadow-2xl">
                  🚀 Começar Grátis Agora
                </Link>
                <a href="#demo" className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-bold py-5 px-10 rounded-xl text-lg transition duration-300 text-center">
                  Ver Demonstração
                </a>
              </div>
              <p className="text-sm text-gray-600">✅ Grátis para sempre • ✅ Sem cartão de crédito • ✅ Setup em 5 minutos</p>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative">
                <div className="absolute -top-4 -right-4 bg-green-500 text-white px-4 py-2 rounded-lg font-bold text-sm shadow-lg trust-badge">
                  ⭐ 4.9/5 - 2.500+ avaliações
                </div>
                <img 
                  src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='450' viewBox='0 0 600 450'%3E%3Cdefs%3E%3ClinearGradient id='grad1' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%233b82f6;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23a855f7;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='url(%23grad1)' width='600' height='450' rx='20'/%3E%3Crect fill='%23ffffff' x='40' y='60' width='520' height='330' rx='15' opacity='0.95'/%3E%3Crect fill='%23f3f4f6' x='60' y='90' width='480' height='50' rx='8'/%3E%3Ccircle fill='%2310b981' cx='85' cy='115' r='10'/%3E%3Crect fill='%23d1d5db' x='110' y='105' width='200' height='20' rx='10'/%3E%3Crect fill='%23eff6ff' x='60' y='160' width='480' height='210' rx='10'/%3E%3Crect fill='%233b82f6' x='80' y='340' width='140' height='15' rx='7'/%3E%3Crect fill='%23a855f7' x='240' y='340' width='140' height='15' rx='7'/%3E%3Crect fill='%2310b981' x='400' y='340' width='140' height='15' rx='7'/%3E%3Cg opacity='0.6'%3E%3Crect fill='%23d1d5db' x='80' y='190' width='460' height='10' rx='5'/%3E%3Crect fill='%23d1d5db' x='80' y='215' width='400' height='10' rx='5'/%3E%3Crect fill='%23d1d5db' x='80' y='240' width='440' height='10' rx='5'/%3E%3Crect fill='%23d1d5db' x='80' y='270' width='460' height='10' rx='5'/%3E%3Crect fill='%23d1d5db' x='80' y='295' width='380' height='10' rx='5'/%3E%3C/g%3E%3C/svg%3E" 
                  alt="Dashboard WhatsCampaign" 
                  className="rounded-2xl shadow-2xl max-w-full transform hover:scale-105 transition duration-500"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof Bar */}
        <section className="py-8 bg-white border-y border-gray-200">
          <div className="container mx-auto px-4">
            <p className="text-center text-gray-600 mb-6 font-semibold">Empresas que confiam no WhatsCampaign:</p>
            <div className="flex justify-center items-center space-x-12 flex-wrap gap-4">
              <div className="text-2xl font-bold text-gray-400">Magazine Luiza</div>
              <div className="text-2xl font-bold text-gray-400">Natura</div>
              <div className="text-2xl font-bold text-gray-400">Herbalife</div>
              <div className="text-2xl font-bold text-gray-400">Hinode</div>
              <div className="text-2xl font-bold text-gray-400">+5.000 empresas</div>
            </div>
          </div>
        </section>

        {/* Problem Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Você está perdendo vendas todos os dias</h2>
            <p className="text-xl text-gray-600 mb-12">Enquanto você envia mensagens uma por uma, seus concorrentes já estão automatizando e lucrando 3x mais.</p>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-8 rounded-xl shadow-md">
                <div className="text-5xl mb-4">😰</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Horas perdidas</h3>
                <p className="text-gray-600">Você gasta <strong>mais de 15h por semana</strong> enviando mensagens manualmente?</p>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-md">
                <div className="text-5xl mb-4">📉</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Baixa conversão</h3>
                <p className="text-gray-600">Suas mensagens genéricas não chamam atenção e <strong>90% não respondem</strong>?</p>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-md">
                <div className="text-5xl mb-4">❌</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Vendas que escapam</h3>
                <p className="text-gray-600">Você sente que <strong>está deixando dinheiro na mesa</strong> por falta de alcance?</p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section id="beneficios" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">A solução definitiva para automatizar e vender mais</h2>
              <p className="text-xl text-gray-600">O WhatsCampaign é a plataforma mais completa do Brasil para campanhas de WhatsApp. Simples, poderosa e com resultados comprovados.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-8 rounded-2xl feature-card bg-gradient-to-br from-blue-50 to-white border border-blue-100 shadow-lg">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <i className="fas fa-rocket text-white text-3xl"></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Economize 15h/semana</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Automatize o envio de <strong>milhares de mensagens</strong> em minutos. Sua equipe pode focar em fechar negócios, não em digitar.
                </p>
              </div>
              
              <div className="text-center p-8 rounded-2xl feature-card bg-gradient-to-br from-green-50 to-white border border-green-100 shadow-lg">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <i className="fas fa-chart-line text-white text-3xl"></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">+300% de conversão</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Mensagens <strong>personalizadas com IA</strong> que chamam atenção e geram respostas. Nossos clientes triplicam as vendas em média.
                </p>
              </div>
              
              <div className="text-center p-8 rounded-2xl feature-card bg-gradient-to-br from-purple-50 to-white border border-purple-100 shadow-lg">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <i className="fas fa-shield-alt text-white text-3xl"></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">100% Seguro</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  <strong>Totalmente em conformidade</strong> com as regras do WhatsApp Business. Seus dados e contas protegidos com criptografia de ponta.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-5xl md:text-6xl font-black mb-2">5.000+</div>
                <div className="text-lg opacity-90">Empresas ativas</div>
              </div>
              <div>
                <div className="text-5xl md:text-6xl font-black mb-2">15M+</div>
                <div className="text-lg opacity-90">Mensagens enviadas</div>
              </div>
              <div>
                <div className="text-5xl md:text-6xl font-black mb-2">300%</div>
                <div className="text-lg opacity-90">Aumento médio em vendas</div>
              </div>
              <div>
                <div className="text-5xl md:text-6xl font-black mb-2">4.9/5</div>
                <div className="text-lg opacity-90">Satisfação dos clientes</div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="casos" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-4">Empresas que multiplicaram resultados</h2>
            <p className="text-center text-xl text-gray-600 mb-16 max-w-2xl mx-auto">Veja como nossos clientes transformaram seus negócios com o WhatsCampaign</p>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: "Mariana Silva",
                  role: "CEO, Beleza Natural",
                  color: "blue",
                  quote: "Aumentamos nossas vendas em <strong>340% em 3 meses</strong>. O WhatsCampaign nos permitiu alcançar milhares de clientes que não conseguíamos antes. Simplesmente incrível!",
                  metric: "+340% em vendas"
                },
                {
                  name: "Carlos Eduardo",
                  role: "Diretor, Auto Peças BR",
                  color: "green",
                  quote: "Economizamos <strong>20 horas por semana</strong> da nossa equipe. O ROI foi absurdo - pagamos o investimento em 1 semana e agora só lucro.",
                  metric: "-20h/semana economizadas"
                },
                {
                  name: "Juliana Costa",
                  role: "Fundadora, Moda & Estilo",
                  color: "purple",
                  quote: "A personalização por IA fez toda diferença. <strong>Taxa de resposta subiu de 8% para 45%</strong>. Nossos clientes adoram receber mensagens personalizadas!",
                  metric: "+437% em engajamento"
                }
              ].map((testimonial, idx) => (
                <div key={idx} className="testimonial-card bg-white p-8 rounded-2xl shadow-lg">
                  <div className="flex items-center mb-6">
                    <div className={`w-14 h-14 rounded-full bg-${testimonial.color}-500 mr-4`}></div>
                    <div>
                      <div className="font-bold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">{testimonial.role}</div>
                    </div>
                  </div>
                  <div className="text-yellow-500 text-xl mb-4">⭐⭐⭐⭐⭐</div>
                  <p className="text-gray-600 italic mb-4" dangerouslySetInnerHTML={{ __html: `"${testimonial.quote}"` }}></p>
                  <div className={`text-${testimonial.color}-600 font-bold`}>{testimonial.metric}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="como-funciona" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-6">Configure em apenas 5 minutos</h2>
            <p className="text-center text-xl text-gray-600 mb-16 max-w-2xl mx-auto">É tão simples que até sua avó conseguiria. Sem complicação técnica.</p>
            
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { num: "1", title: "Conecte", desc: "Escaneie o QR Code e conecte seu WhatsApp Business em 30 segundos", bg: "from-blue-500 to-purple-600" },
                { num: "2", title: "Importe", desc: "Carregue sua lista de contatos em CSV ou Excel. Simples assim.", bg: "from-blue-500 to-purple-600" },
                { num: "3", title: "Personalize", desc: "Use nossa IA para criar mensagens irresistíveis e personalizadas", bg: "from-blue-500 to-purple-600" },
                { num: "✓", title: "Dispare!", desc: "Envie e acompanhe tudo em tempo real. Simples, rápido, eficaz.", bg: "from-green-500 to-emerald-600" }
              ].map((step, idx) => (
                <div key={idx} className="text-center">
                  <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${step.bg} flex items-center justify-center text-white text-3xl font-bold mx-auto mb-6 shadow-xl`}>
                    {step.num}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600 text-lg">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="precos" className="py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-4">Invista menos. Lucre mais.</h2>
            <p className="text-center text-xl text-gray-600 mb-4 max-w-2xl mx-auto">
              Escolha o plano ideal para escalar seu negócio. Cancele quando quiser, sem burocracia.
            </p>
            <p className="text-center text-blue-600 font-bold text-lg mb-12">🎁 30 dias grátis no plano Profissional para novos usuários!</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Basic Plan */}
              <div className="pricing-card bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Inicial</h3>
                  <p className="text-gray-600 mb-4">Perfeito para começar</p>
                  <div className="mb-4">
                    <span className="text-5xl font-black text-gray-900">Grátis</span>
                  </div>
                  <p className="text-sm text-gray-600">Para sempre</p>
                </div>
                <ul className="mb-8 space-y-4">
                  <li className="flex items-start">
                    <i className="fas fa-check text-green-500 text-lg mr-3 mt-1"></i>
                    <span className="text-gray-600"><strong>1.000 contatos</strong></span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check text-green-500 text-lg mr-3 mt-1"></i>
                    <span className="text-gray-600"><strong>5.000 mensagens/mês</strong></span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check text-green-500 text-lg mr-3 mt-1"></i>
                    <span className="text-gray-600"><strong>1 conexão</strong> WhatsApp</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check text-green-500 text-lg mr-3 mt-1"></i>
                    <span className="text-gray-600">Relatórios básicos</span>
                  </li>
                  <li className="flex items-start text-gray-400">
                    <i className="fas fa-times text-gray-400 text-lg mr-3 mt-1"></i>
                    <span>Campanhas com IA</span>
                  </li>
                </ul>
                <Link to="/signup" className="block bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold py-4 px-6 rounded-xl text-center transition duration-300 shadow-md">
                  Começar Grátis
                </Link>
                <p className="text-xs text-center text-gray-600 mt-4">✅ Sem cartão de crédito</p>
              </div>
              
              {/* Professional Plan */}
              <div className="pricing-card popular bg-white rounded-2xl p-8 shadow-2xl relative">
                <div className="popular-badge">✨ MAIS ESCOLHIDO</div>
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Profissional</h3>
                  <p className="text-gray-600 mb-4">Para negócios em crescimento</p>
                  <div className="mb-2">
                    <span className="text-lg text-gray-400 line-through">R$ 297</span>
                  </div>
                  <div className="mb-4">
                    <span className="text-5xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">R$ 149</span>
                    <span className="text-gray-600">/mês</span>
                  </div>
                  <div className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">
                    Economize 50% 🔥
                  </div>
                </div>
                <ul className="mb-8 space-y-4">
                  <li className="flex items-start">
                    <i className="fas fa-check text-green-500 text-lg mr-3 mt-1"></i>
                    <span className="text-gray-600"><strong>10.000 contatos</strong></span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check text-green-500 text-lg mr-3 mt-1"></i>
                    <span className="text-gray-600"><strong>50.000 mensagens/mês</strong></span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check text-green-500 text-lg mr-3 mt-1"></i>
                    <span className="text-gray-600"><strong>5 conexões</strong> simultâneas</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check text-green-500 text-lg mr-3 mt-1"></i>
                    <span className="text-gray-600"><strong>✨ Campanhas com IA</strong> (GPT-4)</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check text-green-500 text-lg mr-3 mt-1"></i>
                    <span className="text-gray-600"><strong>Automação avançada</strong></span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check text-green-500 text-lg mr-3 mt-1"></i>
                    <span className="text-gray-600">Relatórios completos</span>
                  </li>
                </ul>
                <Link to="/signup?plan=pro" className="block bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-xl text-center transition duration-300 shadow-xl">
                  Testar 30 Dias Grátis 🚀
                </Link>
                <p className="text-xs text-center text-gray-600 mt-4">✅ Cancele quando quiser</p>
              </div>
              
              {/* Enterprise Plan */}
              <div className="pricing-card bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Empresarial</h3>
                  <p className="text-gray-600 mb-4">Para grandes operações</p>
                  <div className="mb-4">
                    <span className="text-5xl font-black text-gray-900">R$ 499</span>
                    <span className="text-gray-600">/mês</span>
                  </div>
                  <p className="text-sm text-green-600 font-bold">ROI médio de 800%</p>
                </div>
                <ul className="mb-8 space-y-4">
                  <li className="flex items-start">
                    <i className="fas fa-check text-green-500 text-lg mr-3 mt-1"></i>
                    <span className="text-gray-600"><strong>Contatos ilimitados</strong></span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check text-green-500 text-lg mr-3 mt-1"></i>
                    <span className="text-gray-600"><strong>Mensagens ilimitadas</strong></span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check text-green-500 text-lg mr-3 mt-1"></i>
                    <span className="text-gray-600"><strong>Conexões ilimitadas</strong></span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check text-green-500 text-lg mr-3 mt-1"></i>
                    <span className="text-gray-600"><strong>✨ IA Premium</strong> (GPT-4 Turbo)</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check text-green-500 text-lg mr-3 mt-1"></i>
                    <span className="text-gray-600">Gerente de conta dedicado</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check text-green-500 text-lg mr-3 mt-1"></i>
                    <span className="text-gray-600">API personalizada</span>
                  </li>
                </ul>
                <a href="#contact" className="block bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 px-6 rounded-xl text-center transition duration-300 shadow-xl">
                  Falar com Especialista
                </a>
                <p className="text-xs text-center text-gray-600 mt-4">✅ Consultoria incluída</p>
              </div>
            </div>
            
            {/* Garantia */}
            <div className="mt-16 text-center">
              <div className="inline-block bg-green-50 border-2 border-green-500 rounded-2xl p-8 max-w-2xl">
                <div className="text-5xl mb-4">🛡️</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Garantia de 30 dias ou seu dinheiro de volta</h3>
                <p className="text-gray-600 text-lg">Não gostou? Devolvemos 100% do seu investimento, sem perguntas. Simples assim.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-4">Perguntas Frequentes</h2>
            <p className="text-center text-xl text-gray-600 mb-12">Tudo o que você precisa saber antes de começar</p>
            
            <div className="space-y-6">
              {[
                {
                  q: "É realmente seguro? Não vou ser banido do WhatsApp?",
                  a: "Sim, é 100% seguro. Utilizamos apenas APIs oficiais do WhatsApp Business (WAHA e Evolution API) e respeitamos todos os limites e políticas da plataforma. Mais de 5.000 empresas usam diariamente sem problemas."
                },
                {
                  q: "Preciso de conhecimento técnico?",
                  a: "Não! Nossa plataforma foi criada para ser simples. Se você sabe usar WhatsApp, já sabe usar o WhatsCampaign. Tem vídeos tutoriais e suporte sempre disponível."
                },
                {
                  q: "Posso cancelar quando quiser?",
                  a: "Sim! Não tem multa, não tem burocracia. Cancele com 1 clique no painel. E se cancelar nos primeiros 30 dias, devolvemos 100% do valor."
                },
                {
                  q: "Como funciona a IA para criar mensagens?",
                  a: "Nossa IA (GPT-4) analisa seu produto, público e objetivo, e cria mensagens personalizadas e persuasivas automaticamente. Você também pode editar e ajustar como quiser."
                },
                {
                  q: "Quanto tempo leva para configurar?",
                  a: "5 minutos! Conecte seu WhatsApp, importe seus contatos e crie sua primeira campanha. É realmente muito rápido."
                },
                {
                  q: "Tem suporte em português?",
                  a: "Sim! Suporte 100% em português por chat, email e WhatsApp. No plano Profissional e Empresarial, o suporte é prioritário com resposta em até 2 horas."
                }
              ].map((faq, idx) => (
                <div key={idx} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">❓ {faq.q}</h3>
                  <p className="text-gray-600">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section id="contact" className="py-24 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full filter blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full filter blur-3xl"></div>
          </div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <div className="inline-block bg-white bg-opacity-20 backdrop-blur-sm px-6 py-2 rounded-full text-white font-semibold mb-6">
              ⚡ Oferta por tempo limitado
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
              Chegou a hora de<br/>
              <span className="text-yellow-300">multiplicar suas vendas</span>
            </h2>
            <p className="text-xl md:text-2xl text-white mb-4 max-w-3xl mx-auto opacity-90">
              Junte-se a mais de 5.000 empresas que já faturam 3x mais com automação de WhatsApp.
            </p>
            <p className="text-lg text-yellow-300 font-bold mb-10">
              🎁 30 dias grátis no plano Profissional + Bônus exclusivos
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-8">
              <Link to="/signup" className="cta-glow inline-block bg-white hover:bg-gray-100 text-purple-600 font-black py-6 px-12 rounded-2xl text-xl transition duration-300 shadow-2xl transform hover:scale-105">
                🚀 Começar Agora Grátis
              </Link>
              <a href="#demo" className="inline-block border-3 border-white text-white hover:bg-white hover:text-purple-600 font-bold py-6 px-12 rounded-2xl text-xl transition duration-300 transform hover:scale-105">
                📺 Ver Demonstração
              </a>
            </div>
            
            <div className="flex justify-center items-center space-x-8 text-white flex-wrap gap-4">
              <div className="flex items-center">
                <i className="fas fa-check-circle text-green-300 text-2xl mr-2"></i>
                <span className="font-semibold">Sem cartão de crédito</span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-check-circle text-green-300 text-2xl mr-2"></i>
                <span className="font-semibold">Setup em 5 minutos</span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-check-circle text-green-300 text-2xl mr-2"></i>
                <span className="font-semibold">Garantia de 30 dias</span>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 py-12">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              <div>
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl mr-3">WC</div>
                  <span className="text-white text-xl font-bold">WhatsCampaign</span>
                </div>
                <p className="text-gray-400 text-sm">A plataforma mais completa para automatizar e vender mais no WhatsApp.</p>
              </div>
              
              <div>
                <h4 className="text-white font-bold mb-4">Produto</h4>
                <ul className="space-y-2">
                  <li><a href="#beneficios" className="text-gray-400 hover:text-white transition">Benefícios</a></li>
                  <li><a href="#como-funciona" className="text-gray-400 hover:text-white transition">Como Funciona</a></li>
                  <li><a href="#precos" className="text-gray-400 hover:text-white transition">Preços</a></li>
                  <li><a href="#casos" className="text-gray-400 hover:text-white transition">Casos de Sucesso</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-white font-bold mb-4">Empresa</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white transition">Sobre Nós</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition">Blog</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition">Carreiras</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition">Contato</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-white font-bold mb-4">Suporte</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white transition">Central de Ajuda</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition">Termos de Serviço</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition">Política de Privacidade</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition">Status do Sistema</a></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
              <div className="text-gray-400 text-sm mb-4 md:mb-0">
                © 2025 WhatsCampaign. Todos os direitos reservados.
              </div>
              <div className="flex space-x-6">
                <a href="#" className="text-gray-400 hover:text-white transition text-xl">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition text-xl">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition text-xl">
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition text-xl">
                  <i className="fab fa-youtube"></i>
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default LandingPage;