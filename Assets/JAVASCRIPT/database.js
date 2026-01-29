const BooksDatabase = {
  // Initialize with default books if empty
  init() {
    if (!localStorage.getItem("booksData")) {
      const defaultBooks = [
        {
          id: 1,
          title: "The Quantum Universe",
          author: "Dr. Sarah Johnson",
          category: "Science Fiction",
          type: "Books",
          price: "519.00 EGP",
          tags: "Sci-Fi, Bestseller",
          image: "assets/IMG/61hYNEQezgL.jpg",
          description: "A thrilling journey through the mysteries of quantum physics and parallel universes.",
        },
        {
          id: 2,
          title: "AI Revolution",
          author: "Prof. Michael Chen",
          category: "Artificial Intelligence",
          type: "Researches",
          price: "650.00 EGP",
          tags: "AI, Research",
          image: "assets/IMG/61b7ow1ApXL.jpg",
          description: "Comprehensive research on artificial intelligence and its impact on society.",
        },
        {
          id: 3,
          title: "Modern Web Development",
          author: "Jane Smith",
          category: "Technology",
          type: "Articles",
          price: "399.00 EGP",
          tags: "Tech, Development",
          image: "assets/IMG/images.jpeg",
          description: "Latest trends and best practices in modern web development.",
        },
        {
          id: 4,
          title: "Dragon's Realm",
          author: "Robert Martinez",
          category: "Fantasy",
          type: "Books",
          price: "480.00 EGP",
          tags: "Fantasy, Adventure",
          image: "assets/IMG/the-library-book-9781476740195_hr.jpg",
          description: "An epic fantasy adventure in a world of dragons and magic.",
        },
        {
          id: 5,
          title: "Tales for Young Minds",
          author: "Emily Brown",
          category: "Children",
          type: "Books",
          price: "250.00 EGP",
          tags: "Children, Educational",
          image: "assets/IMG/31+pWw6K3zL._AC_SY200_QL15_.jpg",
          description: "Delightful stories that spark imagination and teach valuable lessons.",
        },
        {
          id: 6,
          title: "Climate Change Today",
          author: "Dr. Lisa Anderson",
          category: "Environmental Science",
          type: "Researches",
          price: "580.00 EGP",
          tags: "Environment, Science",
          image: "assets/IMG/Miniature Book Cover Template.jpg",
          description: "Critical insights into climate change and sustainability challenges.",
        },
        {
          id: 7,
          title: "Education Innovation",
          author: "Thomas Wilson",
          category: "Education",
          type: "Articles",
          price: "350.00 EGP",
          tags: "Education, Innovation",
          image: "assets/IMG/Thriller Novel Kindle Book Cover Template.jpg",
          description: "Exploring innovative approaches to modern education systems.",
        },
        {
          id: 8,
          title: "The Dark Forest",
          author: "Amanda Black",
          category: "Horror",
          type: "Books",
          price: "450.00 EGP",
          tags: "Horror, Thriller",
          image: "assets/IMG/Novel Book Cover Template.jpg",
          description: "A spine-chilling tale of terror in an ancient forest.",
        },
        {
          id: 9,
          title: "Medical Breakthroughs 2024",
          author: "Dr. James Taylor",
          category: "Medical Studies",
          type: "Researches",
          price: "720.00 EGP",
          tags: "Medical, Research",
          image: "assets/IMG/Children_27s Book Cover Template.jpg",
          description: "Latest medical research and breakthrough treatments.",
        },
        {
          id: 10,
          title: "Cultural Perspectives",
          author: "Maria Garcia",
          category: "Culture",
          type: "Articles",
          price: "420.00 EGP",
          tags: "Culture, Society",
          image: "assets/IMG/Free Children_s Story Book Cover Template.jpg",
          description: "Exploring diverse cultural perspectives in the modern world.",
        },
        {
          id: 11,
          title: "World War Chronicles",
          author: "David Thompson",
          category: "History",
          type: "Books",
          price: "550.00 EGP",
          tags: "History, Non-Fiction",
          image: "assets/IMG/Magazine Book Cover Template.jpg",
          description: "Detailed accounts of major historical events and their impacts.",
        },
        {
          id: 12,
          title: "Quantum Physics Explained",
          author: "Dr. Rachel Kim",
          category: "Quantum Physics",
          type: "Researches",
          price: "680.00 EGP",
          tags: "Physics, Science",
          image: "assets/IMG/61hYNEQezgL.jpg",
          description: "Making complex quantum physics concepts accessible to everyone.",
        },
      ]
      localStorage.setItem("booksData", JSON.stringify(defaultBooks))
    }
  },

  // Get all books
  getAllBooks() {
    return JSON.parse(localStorage.getItem("booksData") || "[]")
  },

  // Get books by type
  getBooksByType(type) {
    const books = this.getAllBooks()
    return books.filter((book) => book.type === type)
  },

  // Get books by category
  getBooksByCategory(type, category) {
    const books = this.getAllBooks()
    return books.filter((book) => book.type === type && book.category === category)
  },

  // Search books by title or author
  searchBooks(query, type = null, category = null) {
    let books = this.getAllBooks()

    // Filter by type if provided
    if (type) {
      books = books.filter((book) => book.type === type)
    }

    // Filter by category if provided
    if (category) {
      books = books.filter((book) => book.category === category)
    }

    // Search by query
    if (query) {
      const lowerQuery = query.toLowerCase()
      books = books.filter(
        (book) => book.title.toLowerCase().includes(lowerQuery) || book.author.toLowerCase().includes(lowerQuery),
      )
    }

    return books
  },

  // Get book by ID
  getBookById(id) {
    const books = this.getAllBooks()
    return books.find((book) => book.id === Number.parseInt(id))
  },

  // Add new book (admin function)
  addBook(bookData) {
    const books = this.getAllBooks()
    const newId = Math.max(...books.map((b) => b.id), 0) + 1
    const newBook = { id: newId, ...bookData }
    books.push(newBook)
    localStorage.setItem("booksData", JSON.stringify(books))
    return newBook
  },

  // Update book (admin function)
  updateBook(id, bookData) {
    const books = this.getAllBooks()
    const index = books.findIndex((book) => book.id === Number.parseInt(id))
    if (index !== -1) {
      books[index] = { ...books[index], ...bookData }
      localStorage.setItem("booksData", JSON.stringify(books))
      return books[index]
    }
    return null
  },

  // Delete book (admin function)
  deleteBook(id) {
    const books = this.getAllBooks()
    const filteredBooks = books.filter((book) => book.id !== Number.parseInt(id))
    localStorage.setItem("booksData", JSON.stringify(filteredBooks))
    return filteredBooks.length < books.length
  },
}

// Initialize database on load
BooksDatabase.init()
