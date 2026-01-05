import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar, ImageBackground } from 'react-native';
import { Calendar, MapPin, Clock, BookOpen, Wallet, Home, List, ChevronRight, Phone, Star, Shield, Users, Globe } from 'lucide-react-native';

// --- ДАННЫЕ (Оставляем как есть) ---
const toursData = [
  {
    id: '1',
    title: 'Умра Премиум',
    type: 'umrah',
    country: 'Саудовская Аравия',
    city: 'Мекка, Медина',
    price: 1800000,
    startDate: '2026-02-15',
    durationDays: 10,
    description: 'Полный пакет для совершения Умры с проживанием в отелях класса люкс рядом с Харамом. Включает визу, авиаперелет, трансфер и сопровождение.',
    requirements: ['Махрам для женщин', 'Загранпаспорт', 'Медицинская страховка'],
    halalSupport: true
  },
  {
    id: '2',
    title: 'Хадж 2026',
    type: 'hajj',
    country: 'Саудовская Аравия',
    city: 'Мекка, Медина, Арафат',
    price: 3500000,
    startDate: '2026-06-10',
    durationDays: 18,
    description: 'Организация полного паломничества Хадж с опытными гидами и комфортным размещением.',
    requirements: ['Квота на Хадж', 'Справка о здоровье', 'Прививки'],
    halalSupport: true
  },
  {
    id: '3',
    title: 'Зиярат Иерусалим',
    type: 'ziyarat',
    country: 'Палестина',
    city: 'Иерусалим',
    price: 950000,
    startDate: '2026-03-01',
    durationDays: 7,
    description: 'Паломничество к Аль-Акса - третьей святыне Ислама. Посещение исторических мест.',
    requirements: ['Загранпаспорт', 'Виза'],
    halalSupport: true
  },
  {
    id: '4',
    title: 'Исламская Турция',
    type: 'cultural',
    country: 'Турция',
    city: 'Стамбул, Бурса',
    price: 750000,
    startDate: '2026-02-20',
    durationDays: 6,
    description: 'Культурно-познавательный тур по исламским достопримечательностям Турции.',
    requirements: ['Загранпаспорт'],
    halalSupport: true
  },
  {
    id: '5',
    title: 'Умра Эконом',
    type: 'umrah',
    country: 'Саудовская Аравия',
    city: 'Мекка, Медина',
    price: 1200000,
    startDate: '2026-03-15',
    durationDays: 8,
    description: 'Доступный пакет Умры с комфортным проживанием и всеми необходимыми услугами.',
    requirements: ['Махрам для женщин', 'Загранпаспорт'],
    halalSupport: true
  },
  {
    id: '6',
    title: 'Зиярат Египет',
    type: 'ziyarat',
    country: 'Египет',
    city: 'Каир, Александрия',
    price: 850000,
    startDate: '2026-04-05',
    durationDays: 7,
    description: 'Посещение мечети Аль-Азхар и других исламских святынь Египта.',
    requirements: ['Загранпаспорт', 'Виза'],
    halalSupport: true
  }
];

const knowledgeData = [
  {
    id: 'k1',
    title: 'Что такое Умра',
    category: 'Основы',
    content: `Умра — это малое паломничество в Мекку, которое можно совершать в любое время года.\n\nОсновные обряды Умры:\n• Ихрам — состояние ритуальной чистоты\n• Таваф — семикратный обход Каабы\n• Саи — хождение между холмами Сафа и Марва\n• Бритье или укорачивание волос\n\nУмра не заменяет Хадж, но является богоугодным делом, очищающим от грехов.`
  },
  {
    id: 'k2',
    title: 'Разница между Хадж и Умра',
    category: 'Основы',
    content: `Хадж — обязательное паломничество, один из пяти столпов Ислама.\nУмра — желательное паломничество.\n\nГлавные отличия:\n• Хадж совершается в определенное время (8-13 Зуль-хиджа)\n• Умра можно совершать круглый год\n• Хадж включает больше обрядов (стояние на Арафате, Мина)\n• Хадж обязателен раз в жизни для способных\n• Умра — добровольное поклонение`
  },
  {
    id: 'k3',
    title: 'Требования для паломничества',
    category: 'Подготовка',
    content: `Для совершения паломничества необходимо:\n\nДуховная подготовка:\n• Искреннее намерение (ният)\n• Покаяние в грехах\n• Изучение обрядов\n\nМатериальная подготовка:\n• Финансовая возможность\n• Разрешение долгов\n• Обеспечение семьи\n\nДокументы:\n• Действующий загранпаспорт\n• Виза\n• Прививки (менингит, COVID-19)\n• Для женщин: сопровождение махрама`
  }
];

// --- КОМПОНЕНТЫ ---

const Screen = ({ children, title, onBack, style }) => (
  <SafeAreaView style={[styles.screen, style]}>
    <StatusBar barStyle="dark-content" backgroundColor="#fff" />
    {title && (
      <View style={styles.header}>
        {onBack && (
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <Text style={styles.backButtonText}>← Назад</Text>
          </TouchableOpacity>
        )}
        <Text style={styles.headerTitle}>{title}</Text>
      </View>
    )}
    <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
      {children}
    </ScrollView>
  </SafeAreaView>
);

// НОВЫЙ ЭКРАН: Главная страница (Визитка)
const LandingScreen = ({ onNavigate }) => {
  return (
    <SafeAreaView style={styles.landingContainer}>
      <StatusBar barStyle="light-content" backgroundColor="#047857" />
      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* 1. Hero-секция: Заголовок и приветствие */}
        <View style={styles.heroSection}>
          <View style={styles.heroContent}>
            <Text style={styles.heroGreeting}>Ассаламу алейкум!</Text>
            <Text style={styles.heroTitle}>Islamic Tours</Text>
            <Text style={styles.heroSubtitle}>Ваш надежный проводник{"\n"}к святым местам</Text>
            
            <TouchableOpacity 
              style={styles.heroButton}
              onPress={() => onNavigate('catalog')}
            >
              <Text style={styles.heroButtonText}>Подобрать тур</Text>
              <ChevronRight size={20} color="#047857" />
            </TouchableOpacity>
          </View>
          {/* Декоративные круги */}
          <View style={styles.circle1} />
          <View style={styles.circle2} />
        </View>

        {/* 2. Статистика / Преимущества */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Shield size={28} color="#047857" />
            <Text style={styles.statValue}>100%</Text>
            <Text style={styles.statLabel}>Халяль</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Users size={28} color="#047857" />
            <Text style={styles.statValue}>5000+</Text>
            <Text style={styles.statLabel}>Паломников</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Star size={28} color="#047857" />
            <Text style={styles.statValue}>5 лет</Text>
            <Text style={styles.statLabel}>Опыта</Text>
          </View>
        </View>

        {/* 3. Основные направления (Крупное меню) */}
        <View style={styles.section}>
          <Text style={styles.landingSectionTitle}>Наши направления</Text>
          
          <View style={styles.servicesGrid}>
            <TouchableOpacity 
              style={[styles.serviceCard, { backgroundColor: '#ecfdf5' }]}
              onPress={() => onNavigate('tours', { filter: 'umrah' })}
            >
              <Globe size={32} color="#047857" />
              <Text style={styles.serviceTitle}>Умра</Text>
              <Text style={styles.serviceDesc}>Малое паломничество</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.serviceCard, { backgroundColor: '#fffbeb' }]}
              onPress={() => onNavigate('tours', { filter: 'hajj' })}
            >
              <View style={styles.iconBoxGold}>
                <MapPin size={32} color="#b45309" />
              </View>
              <Text style={[styles.serviceTitle, { color: '#b45309' }]}>Хадж</Text>
              <Text style={styles.serviceDesc}>Обязательное паломничество</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.serviceCard, { backgroundColor: '#eff6ff' }]}
              onPress={() => onNavigate('tours', { filter: 'ziyarat' })}
            >
              <BookOpen size={32} color="#1d4ed8" />
              <Text style={[styles.serviceTitle, { color: '#1d4ed8' }]}>Зиярат</Text>
              <Text style={styles.serviceDesc}>Посещение святынь</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.serviceCard, { backgroundColor: '#faf5ff' }]}
              onPress={() => onNavigate('tours', { filter: 'cultural' })}
            >
              <List size={32} color="#7e22ce" />
              <Text style={[styles.serviceTitle, { color: '#7e22ce' }]}>Туризм</Text>
              <Text style={styles.serviceDesc}>Халяль отдых</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 4. Блок "О нас" / Призыв */}
        <View style={styles.aboutSection}>
          <Text style={styles.aboutTitle}>Почему выбирают нас?</Text>
          <Text style={styles.aboutText}>
            Мы берем на себя все заботы: от оформления визы до проживания в отелях рядом с Харамом. 
            С нами ваше паломничество будет комфортным и принятым Всевышним.
          </Text>
          <TouchableOpacity 
            style={styles.outlineButton}
            onPress={() => onNavigate('knowledge')}
          >
            <Text style={styles.outlineButtonText}>Узнать больше о подготовке</Text>
          </TouchableOpacity>
        </View>

        {/* 5. Контакты */}
        <View style={styles.contactSection}>
          <Text style={styles.contactTitle}>Свяжитесь с нами</Text>
          <View style={styles.contactRow}>
            <Phone size={20} color="#fff" />
            <Text style={styles.contactText}>+7 (777) 123-45-67</Text>
          </View>
          <View style={styles.contactRow}>
            <MapPin size={20} color="#fff" />
            <Text style={styles.contactText}>г. Алматы, пр. Абая 150</Text>
          </View>
        </View>
        
        {/* Отступ для нижнего меню */}
        <View style={{ height: 80 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

// Экран Каталога (Бывший HomeScreen)
const CatalogScreen = ({ onNavigate }) => {
  const upcomingTours = toursData
    .filter(tour => new Date(tour.startDate) > new Date())
    .sort((a, b) => new Date(a.startDate) - new Date(b.startDate))
    .slice(0, 3);

  return (
    <Screen title="Каталог туров">
      <View style={styles.container}>
        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Ближайшие вылеты</Text>
            <TouchableOpacity onPress={() => onNavigate('tours')}>
              <Text style={styles.seeAllText}>Все</Text>
            </TouchableOpacity>
          </View>
          
          {upcomingTours.map(tour => (
            <TouchableOpacity
              key={tour.id}
              style={styles.tourCard}
              onPress={() => onNavigate('tour', tour)}
            >
              <View style={styles.tourCardHeader}>
                <Text style={styles.tourTitle}>{tour.title}</Text>
                <Text style={styles.tourPrice}>{(tour.price / 1000).toFixed(0)}k ₸</Text>
              </View>
              <View style={styles.tourInfoRow}>
                <View style={styles.tourInfo}>
                  <MapPin size={14} color="#666" />
                  <Text style={styles.tourInfoText}>{tour.city}</Text>
                </View>
                <View style={styles.tourInfo}>
                  <Calendar size={14} color="#666" />
                  <Text style={styles.tourInfoText}>
                    {new Date(tour.startDate).toLocaleDateString('ru-RU')}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.promoBanner}>
          <Text style={styles.promoTitle}>Копите на Хадж?</Text>
          <Text style={styles.promoText}>Откройте виртуальный кошелек и отслеживайте накопления</Text>
          <TouchableOpacity 
            style={styles.promoButton}
            onPress={() => onNavigate('wallet')}
          >
            <Text style={styles.promoButtonText}>Перейти в кошелёк</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Screen>
  );
};

const ToursScreen = ({ onNavigate, onBack, initialFilter = 'all' }) => {
  const [filter, setFilter] = useState(initialFilter);
  
  // Если пришли с параметром, устанавливаем его (один раз)
  useEffect(() => {
    if (initialFilter) setFilter(initialFilter);
  }, [initialFilter]);

  const filteredTours = filter === 'all' 
    ? toursData 
    : toursData.filter(t => t.type === filter);

  return (
    <Screen title="Все туры" onBack={onBack}>
      <View style={styles.container}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
          <View style={styles.filterContainer}>
            {['all', 'umrah', 'hajj', 'ziyarat'].map((type) => (
              <TouchableOpacity
                key={type}
                style={[styles.filterButton, filter === type && styles.filterButtonActive]}
                onPress={() => setFilter(type)}
              >
                <Text style={[styles.filterButtonText, filter === type && styles.filterButtonTextActive]}>
                  {type === 'all' ? 'Все' : type === 'umrah' ? 'Умра' : type === 'hajj' ? 'Хадж' : 'Зиярат'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {filteredTours.length === 0 ? (
          <Text style={styles.emptyText}>В данной категории пока нет туров.</Text>
        ) : (
          filteredTours.map(tour => (
            <TouchableOpacity
              key={tour.id}
              style={styles.tourCard}
              onPress={() => onNavigate('tour', tour)}
            >
              <View style={styles.tourCardHeader}>
                <Text style={styles.tourTitle}>{tour.title}</Text>
                <Text style={styles.tourPrice}>{(tour.price / 1000).toFixed(0)}k ₸</Text>
              </View>
              <View style={styles.tourInfo}>
                <MapPin size={14} color="#666" />
                <Text style={styles.tourInfoText}>{tour.city}</Text>
              </View>
              <View style={styles.tourInfo}>
                <Calendar size={14} color="#666" />
                <Text style={styles.tourInfoText}>
                  {new Date(tour.startDate).toLocaleDateString('ru-RU')}
                </Text>
              </View>
              <View style={styles.tourInfo}>
                <Clock size={14} color="#666" />
                <Text style={styles.tourInfoText}>{tour.durationDays} дней</Text>
              </View>
            </TouchableOpacity>
          ))
        )}
      </View>
    </Screen>
  );
};

const TourDetailScreen = ({ tour, onBack }) => {
  return (
    <Screen title={tour.title} onBack={onBack}>
      <View style={styles.container}>
        <View style={styles.tourDetailHeader}>
          <Text style={styles.tourDetailPrice}>{tour.price.toLocaleString('ru-RU')} ₸</Text>
          <Text style={styles.tourDetailCountry}>{tour.country}</Text>
        </View>

        <View style={styles.detailSection}>
          <Text style={styles.detailLabel}>Города</Text>
          <Text style={styles.detailValue}>{tour.city}</Text>
        </View>

        <View style={styles.detailSection}>
          <Text style={styles.detailLabel}>Дата начала</Text>
          <Text style={styles.detailValue}>
            {new Date(tour.startDate).toLocaleDateString('ru-RU', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </Text>
        </View>

        <View style={styles.detailSection}>
          <Text style={styles.detailLabel}>Длительность</Text>
          <Text style={styles.detailValue}>{tour.durationDays} дней</Text>
        </View>

        <View style={styles.detailSection}>
          <Text style={styles.detailLabel}>Описание</Text>
          <Text style={styles.detailText}>{tour.description}</Text>
        </View>

        <View style={styles.detailSection}>
          <Text style={styles.detailLabel}>Требования</Text>
          {tour.requirements.map((req, index) => (
            <Text key={index} style={styles.requirementItem}>• {req}</Text>
          ))}
        </View>

        {tour.halalSupport && (
          <View style={styles.halalBadge}>
            <Text style={styles.halalBadgeText}>✓ Халяль инфраструктура</Text>
          </View>
        )}

        <TouchableOpacity style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>Забронировать тур</Text>
        </TouchableOpacity>
      </View>
    </Screen>
  );
};

const KnowledgeScreen = ({ onNavigate, onBack }) => {
  return (
    <Screen title="База знаний" onBack={onBack}>
      <View style={styles.container}>
        {knowledgeData.map(article => (
          <TouchableOpacity
            key={article.id}
            style={styles.knowledgeCard}
            onPress={() => onNavigate('article', article)}
          >
            <View style={styles.knowledgeCardContent}>
              <BookOpen size={24} color="#047857" />
              <View style={styles.knowledgeCardText}>
                <Text style={styles.knowledgeTitle}>{article.title}</Text>
                <Text style={styles.knowledgeCategory}>{article.category}</Text>
              </View>
            </View>
            <ChevronRight size={20} color="#999" />
          </TouchableOpacity>
        ))}
      </View>
    </Screen>
  );
};

const ArticleScreen = ({ article, onBack }) => {
  return (
    <Screen title={article.title} onBack={onBack}>
      <View style={styles.container}>
        <View style={styles.articleHeader}>
          <Text style={styles.articleCategory}>{article.category}</Text>
        </View>
        <Text style={styles.articleContent}>{article.content}</Text>
      </View>
    </Screen>
  );
};

const WalletScreen = ({ onBack }) => {
  const [wallet, setWallet] = useState({
    balance: 350000,
    monthlyTopUp: 50000,
    nextTopUpDate: '2026-02-01',
    history: [
      { date: '2026-01-01', amount: 50000, type: 'auto' },
      { date: '2025-12-01', amount: 50000, type: 'auto' },
      { date: '2025-11-01', amount: 50000, type: 'auto' }
    ]
  });

  return (
    <Screen title="Виртуальный кошелёк" onBack={onBack}>
      <View style={styles.container}>
        <View style={styles.walletCard}>
          <Text style={styles.walletLabel}>Текущий баланс</Text>
          <Text style={styles.walletBalance}>
            {wallet.balance.toLocaleString('ru-RU')} ₸
          </Text>
        </View>

        <View style={styles.walletInfo}>
          <View style={styles.walletInfoItem}>
            <Text style={styles.walletInfoLabel}>Ежемесячное пополнение</Text>
            <Text style={styles.walletInfoValue}>
              {wallet.monthlyTopUp.toLocaleString('ru-RU')} ₸
            </Text>
          </View>
          <View style={styles.walletInfoItem}>
            <Text style={styles.walletInfoLabel}>Следующее пополнение</Text>
            <Text style={styles.walletInfoValue}>
              {new Date(wallet.nextTopUpDate).toLocaleDateString('ru-RU')}
            </Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>История операций</Text>
        {wallet.history.map((transaction, index) => (
          <View key={index} style={styles.transactionCard}>
            <View>
              <Text style={styles.transactionType}>
                {transaction.type === 'auto' ? 'Автопополнение' : 'Пополнение'}
              </Text>
              <Text style={styles.transactionDate}>
                {new Date(transaction.date).toLocaleDateString('ru-RU')}
              </Text>
            </View>
            <Text style={styles.transactionAmount}>
              +{transaction.amount.toLocaleString('ru-RU')} ₸
            </Text>
          </View>
        ))}
      </View>
    </Screen>
  );
};

// --- ГЛАВНЫЙ КОМПОНЕНТ ---
export default function App() {
  const [currentScreen, setCurrentScreen] = useState('landing'); // Начинаем с Landing
  const [selectedItem, setSelectedItem] = useState(null);
  const [routeParams, setRouteParams] = useState({});

  const navigate = (screen, item = null) => {
    // Если передали объект вторым параметром, проверяем, это параметры или данные
    if (item && item.filter) {
        setRouteParams(item);
        setSelectedItem(null);
    } else {
        setSelectedItem(item);
        setRouteParams({});
    }
    setCurrentScreen(screen);
  };

  const goBack = () => {
    // Логика кнопки "Назад"
    if (currentScreen === 'tours' || currentScreen === 'catalog') {
      setCurrentScreen('landing');
    } else if (currentScreen === 'tour') {
      setCurrentScreen('catalog');
    } else if (currentScreen === 'article') {
      setCurrentScreen('knowledge');
    } else {
      setCurrentScreen('landing');
    }
    setSelectedItem(null);
    setRouteParams({});
  };

  return (
    <View style={styles.app}>
      {currentScreen === 'landing' && <LandingScreen onNavigate={navigate} />}
      {currentScreen === 'catalog' && <CatalogScreen onNavigate={navigate} />}
      {currentScreen === 'tours' && <ToursScreen onNavigate={navigate} onBack={goBack} initialFilter={routeParams.filter} />}
      {currentScreen === 'tour' && <TourDetailScreen tour={selectedItem} onBack={goBack} />}
      {currentScreen === 'knowledge' && <KnowledgeScreen onNavigate={navigate} onBack={goBack} />}
      {currentScreen === 'article' && <ArticleScreen article={selectedItem} onBack={goBack} />}
      {currentScreen === 'wallet' && <WalletScreen onBack={goBack} />}

      {/* Нижняя навигация (скрыта на Landing) */}
      {currentScreen !== 'landing' && (
        <View style={styles.bottomNav}>
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => navigate('landing')}
          >
            <Home size={24} color={currentScreen === 'landing' ? '#047857' : '#999'} />
            <Text style={[styles.navButtonText, currentScreen === 'landing' && styles.navButtonTextActive]}>
              Главная
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => navigate('catalog')}
          >
            <List size={24} color={(currentScreen === 'catalog' || currentScreen === 'tours') ? '#047857' : '#999'} />
            <Text style={[styles.navButtonText, (currentScreen === 'catalog' || currentScreen === 'tours') && styles.navButtonTextActive]}>
              Туры
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => navigate('knowledge')}
          >
            <BookOpen size={24} color={currentScreen === 'knowledge' ? '#047857' : '#999'} />
            <Text style={[styles.navButtonText, currentScreen === 'knowledge' && styles.navButtonTextActive]}>
              Знания
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => navigate('wallet')}
          >
            <Wallet size={24} color={currentScreen === 'wallet' ? '#047857' : '#999'} />
            <Text style={[styles.navButtonText, currentScreen === 'wallet' && styles.navButtonTextActive]}>
              Кошелёк
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

// --- СТИЛИ ---
const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  screen: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  landingContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#fff',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 16,
  },
  backButtonText: {
    color: '#047857',
    fontSize: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1f2937',
  },
  scrollView: {
    flex: 1,
    marginBottom: 70, // Отступ для нижней навигации
  },
  container: {
    padding: 16,
  },
  // HERO SECTION STYLES
  heroSection: {
    backgroundColor: '#047857',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 60,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    position: 'relative',
    overflow: 'hidden',
  },
  heroContent: {
    zIndex: 2,
  },
  heroGreeting: {
    color: '#a7f3d0',
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '600',
  },
  heroTitle: {
    color: '#fff',
    fontSize: 36,
    fontWeight: '800',
    marginBottom: 8,
  },
  heroSubtitle: {
    color: '#e5e7eb',
    fontSize: 18,
    lineHeight: 26,
    marginBottom: 24,
  },
  heroButton: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 50,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  heroButtonText: {
    color: '#047857',
    fontWeight: '700',
    fontSize: 16,
  },
  circle1: {
    position: 'absolute',
    top: -50,
    right: -50,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  circle2: {
    position: 'absolute',
    bottom: -20,
    left: -20,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  
  // STATS STYLES
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: -30,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    zIndex: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1f2937',
    marginTop: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#e5e7eb',
  },

  // SECTIONS
  section: {
    marginBottom: 24,
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  landingSectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 12,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  seeAllText: {
    color: '#047857',
    fontWeight: '600',
  },
  
  // SERVICE GRID
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  serviceCard: {
    width: '48%',
    padding: 16,
    borderRadius: 16,
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  serviceTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 12,
    color: '#047857',
  },
  serviceDesc: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
  },
  
  // ABOUT SECTION
  aboutSection: {
    margin: 16,
    padding: 20,
    backgroundColor: '#f8fafc',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  aboutTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 8,
  },
  aboutText: {
    fontSize: 14,
    color: '#4b5563',
    lineHeight: 22,
    marginBottom: 16,
  },
  outlineButton: {
    borderWidth: 1,
    borderColor: '#047857',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  outlineButtonText: {
    color: '#047857',
    fontWeight: '600',
  },

  // CONTACT SECTION
  contactSection: {
    backgroundColor: '#1f2937',
    padding: 24,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  contactTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  contactText: {
    color: '#d1d5db',
    fontSize: 16,
  },

  // CARDS STYLES
  tourCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#f3f4f6',
  },
  tourCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  tourTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    flex: 1,
  },
  tourPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#047857',
  },
  tourInfoRow: {
    flexDirection: 'row',
    gap: 16,
  },
  tourInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    marginRight: 12,
  },
  tourInfoText: {
    marginLeft: 6,
    fontSize: 14,
    color: '#6b7280',
  },
  
  // PROMO BANNER
  promoBanner: {
    backgroundColor: '#064e3b',
    padding: 20,
    borderRadius: 16,
    marginTop: 10,
  },
  promoTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  promoText: {
    color: '#a7f3d0',
    fontSize: 14,
    marginBottom: 16,
  },
  promoButton: {
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  promoButtonText: {
    color: '#064e3b',
    fontWeight: '600',
  },

  // FILTERS
  filterScroll: {
    marginBottom: 16,
  },
  filterContainer: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 4,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  filterButtonActive: {
    backgroundColor: '#047857',
    borderColor: '#047857',
  },
  filterButtonText: {
    fontSize: 14,
    color: '#6b7280',
  },
  filterButtonTextActive: {
    color: '#fff',
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    marginTop: 40,
  },

  // DETAILS
  tourDetailHeader: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    alignItems: 'center',
  },
  tourDetailPrice: {
    fontSize: 32,
    fontWeight: '700',
    color: '#047857',
    marginBottom: 8,
  },
  tourDetailCountry: {
    fontSize: 16,
    color: '#6b7280',
  },
  detailSection: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  detailText: {
    fontSize: 16,
    color: '#1f2937',
    lineHeight: 24,
  },
  requirementItem: {
    fontSize: 14,
    color: '#1f2937',
    marginBottom: 4,
  },
  halalBadge: {
    backgroundColor: '#d1fae5',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  halalBadgeText: {
    fontSize: 14,
    color: '#047857',
    fontWeight: '600',
    textAlign: 'center',
  },
  primaryButton: {
    backgroundColor: '#047857',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },

  // KNOWLEDGE & WALLET
  knowledgeCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  knowledgeCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  knowledgeCardText: {
    marginLeft: 12,
    flex: 1,
  },
  knowledgeTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  knowledgeCategory: {
    fontSize: 14,
    color: '#6b7280',
  },
  articleHeader: {
    marginBottom: 16,
  },
  articleCategory: {
    fontSize: 14,
    color: '#047857',
    fontWeight: '600',
  },
  articleContent: {
    fontSize: 16,
    color: '#1f2937',
    lineHeight: 24,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
  },
  walletCard: {
    backgroundColor: '#047857',
    padding: 24,
    borderRadius: 16,
    marginBottom: 20,
    alignItems: 'center',
  },
  walletLabel: {
    fontSize: 14,
    color: '#d1fae5',
    marginBottom: 8,
  },
  walletBalance: {
    fontSize: 36,
    fontWeight: '700',
    color: '#fff',
  },
  walletInfo: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  walletInfoItem: {
    marginBottom: 16,
  },
  walletInfoLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  walletInfoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  transactionCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  transactionType: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  transactionDate: {
    fontSize: 14,
    color: '#6b7280',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#047857',
  },
  
  // NAV
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
  },
  navButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  navButtonText: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  navButtonTextActive: {
    color: '#047857',
    fontWeight: '600',
  },
});