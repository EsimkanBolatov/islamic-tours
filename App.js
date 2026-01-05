import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView, TextInput, Modal } from 'react-native';
import { Calendar, MapPin, Clock, DollarSign, BookOpen, Wallet, Home, List, ChevronRight, X } from 'lucide-react';

// Псевдоданные туров
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

// База знаний
const knowledgeData = [
  {
    id: 'k1',
    title: 'Что такое Умра',
    category: 'Основы',
    content: `Умра — это малое паломничество в Мекку, которое можно совершать в любое время года.

Основные обряды Умры:
• Ихрам — состояние ритуальной чистоты
• Таваф — семикратный обход Каабы
• Саи — хождение между холмами Сафа и Марва
• Бритье или укорачивание волос

Умра не заменяет Хадж, но является богоугодным делом, очищающим от грехов.`
  },
  {
    id: 'k2',
    title: 'Разница между Хадж и Умра',
    category: 'Основы',
    content: `Хадж — обязательное паломничество, один из пяти столпов Ислама.
Умра — желательное паломничество.

Главные отличия:
• Хадж совершается в определенное время (8-13 Зуль-хиджа)
• Умра можно совершать круглый год
• Хадж включает больше обрядов (стояние на Арафате, Мина)
• Хадж обязателен раз в жизни для способных
• Умра — добровольное поклонение`
  },
  {
    id: 'k3',
    title: 'Требования для паломничества',
    category: 'Подготовка',
    content: `Для совершения паломничества необходимо:

Духовная подготовка:
• Искреннее намерение (ният)
• Покаяние в грехах
• Изучение обрядов

Материальная подготовка:
• Финансовая возможность
• Разрешение долгов
• Обеспечение семьи

Документы:
• Действующий загранпаспорт
• Виза
• Прививки (менингит, COVID-19)
• Для женщин: сопровождение махрама`
  }
];

// Компонент экрана
const Screen = ({ children, title, onBack }) => (
  <SafeAreaView style={styles.screen}>
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
    <ScrollView style={styles.scrollView}>{children}</ScrollView>
  </SafeAreaView>
);

// Главный экран
const HomeScreen = ({ onNavigate }) => {
  const upcomingTours = toursData
    .filter(tour => new Date(tour.startDate) > new Date())
    .sort((a, b) => new Date(a.startDate) - new Date(b.startDate))
    .slice(0, 3);

  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.welcomeSection}>
          <Text style={styles.greeting}>Ассаламу алейкум!</Text>
          <Text style={styles.subtitle}>Ваш путь к святым местам</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ближайшие туры</Text>
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
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.quickActions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => onNavigate('tours')}
          >
            <List size={24} color="#047857" />
            <Text style={styles.actionButtonText}>Все туры</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => onNavigate('knowledge')}
          >
            <BookOpen size={24} color="#047857" />
            <Text style={styles.actionButtonText}>База знаний</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => onNavigate('wallet')}
          >
            <Wallet size={24} color="#047857" />
            <Text style={styles.actionButtonText}>Кошелёк</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Screen>
  );
};

// Список туров
const ToursScreen = ({ onNavigate, onBack }) => {
  const [filter, setFilter] = useState('all');
  
  const filteredTours = filter === 'all' 
    ? toursData 
    : toursData.filter(t => t.type === filter);

  return (
    <Screen title="Все туры" onBack={onBack}>
      <View style={styles.container}>
        <View style={styles.filterContainer}>
          <TouchableOpacity
            style={[styles.filterButton, filter === 'all' && styles.filterButtonActive]}
            onPress={() => setFilter('all')}
          >
            <Text style={[styles.filterButtonText, filter === 'all' && styles.filterButtonTextActive]}>
              Все
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterButton, filter === 'umrah' && styles.filterButtonActive]}
            onPress={() => setFilter('umrah')}
          >
            <Text style={[styles.filterButtonText, filter === 'umrah' && styles.filterButtonTextActive]}>
              Умра
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterButton, filter === 'hajj' && styles.filterButtonActive]}
            onPress={() => setFilter('hajj')}
          >
            <Text style={[styles.filterButtonText, filter === 'hajj' && styles.filterButtonTextActive]}>
              Хадж
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterButton, filter === 'ziyarat' && styles.filterButtonActive]}
            onPress={() => setFilter('ziyarat')}
          >
            <Text style={[styles.filterButtonText, filter === 'ziyarat' && styles.filterButtonTextActive]}>
              Зиярат
            </Text>
          </TouchableOpacity>
        </View>

        {filteredTours.map(tour => (
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
        ))}
      </View>
    </Screen>
  );
};

// Детальный экран тура
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

// База знаний
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

// Статья базы знаний
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

// Виртуальный кошелёк
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

  useEffect(() => {
    // Проверка автопополнения
    const checkAutoTopUp = () => {
      const now = new Date();
      const nextTopUp = new Date(wallet.nextTopUpDate);
      
      if (now >= nextTopUp) {
        const newBalance = wallet.balance + wallet.monthlyTopUp;
        const newHistory = [
          {
            date: now.toISOString().split('T')[0],
            amount: wallet.monthlyTopUp,
            type: 'auto'
          },
          ...wallet.history
        ];
        
        const newNextDate = new Date(nextTopUp);
        newNextDate.setMonth(newNextDate.getMonth() + 1);
        
        setWallet({
          ...wallet,
          balance: newBalance,
          nextTopUpDate: newNextDate.toISOString().split('T')[0],
          history: newHistory
        });
      }
    };
    
    checkAutoTopUp();
  }, []);

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

// Главный компонент приложения
export default function App() {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [selectedItem, setSelectedItem] = useState(null);

  const navigate = (screen, item = null) => {
    setCurrentScreen(screen);
    setSelectedItem(item);
  };

  const goBack = () => {
    setCurrentScreen('home');
    setSelectedItem(null);
  };

  return (
    <View style={styles.app}>
      {currentScreen === 'home' && <HomeScreen onNavigate={navigate} />}
      {currentScreen === 'tours' && <ToursScreen onNavigate={navigate} onBack={goBack} />}
      {currentScreen === 'tour' && <TourDetailScreen tour={selectedItem} onBack={goBack} />}
      {currentScreen === 'knowledge' && <KnowledgeScreen onNavigate={navigate} onBack={goBack} />}
      {currentScreen === 'article' && <ArticleScreen article={selectedItem} onBack={goBack} />}
      {currentScreen === 'wallet' && <WalletScreen onBack={goBack} />}

      {/* Нижняя навигация */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigate('home')}
        >
          <Home size={24} color={currentScreen === 'home' ? '#047857' : '#999'} />
          <Text style={[styles.navButtonText, currentScreen === 'home' && styles.navButtonTextActive]}>
            Главная
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigate('tours')}
        >
          <List size={24} color={currentScreen === 'tours' ? '#047857' : '#999'} />
          <Text style={[styles.navButtonText, currentScreen === 'tours' && styles.navButtonTextActive]}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  screen: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#fff',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  backButton: {
    marginBottom: 8,
  },
  backButtonText: {
    color: '#047857',
    fontSize: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1f2937',
  },
  scrollView: {
    flex: 1,
    marginBottom: 70,
  },
  container: {
    padding: 16,
  },
  welcomeSection: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  greeting: {
    fontSize: 28,
    fontWeight: '700',
    color: '#047857',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 12,
  },
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
  tourInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  tourInfoText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#6b7280',
  },
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    minWidth: '30%',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  actionButtonText: {
    marginTop: 8,
    fontSize: 14,
    color: '#1f2937',
    textAlign: 'center',
  },
  filterContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 8,
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