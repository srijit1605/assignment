const ratings = {};
const productsList = [
    {
        productName: 'Vitamin C Serum',
        id: 'vitamincserum',
        category: 'Glow',
        mrp: '1095',
        rating: 4.3
    },
    {
        productName: 'Pink Clay Mask',
        id: 'pinkclaymask',
        category: 'Glow',
        mrp: '845',
        rating: 4.7
    },
    {
        productName: 'Day Cream',
        id: 'daycream',
        category: 'Dry',
        mrp: '845',
        rating: 4.1
    },
    {
        productName: 'Night Cream',
        id: 'nightcream',
        category: 'Dry',
        mrp: '945',
        rating: 4.7
    },
    {
        productName: 'Hyaluronic Acid Serum',
        id: 'hyaluronicacidserum',
        category: 'Dry',
        mrp: '975',
        rating: 4.9
    },
    {
        productName: 'Acne Busting Serum',
        id: 'acnebustingserum',
        category: 'Acne',
        mrp: '975',
        rating: 4.6
    },
    {
        productName: 'Green Clay Mask',
        id: 'greenclaymask',
        category: 'Acne',
        mrp: '695',
        rating: 4.7
    },
    {
        productName: 'Day Gel',
        id: 'daygel',
        category: 'Dry',
        mrp: '645',
        rating: 4.9
    },
    {
        productName: 'AHA Serum',
        id: 'ahaserum',
        category: 'Glow',
        mrp: '1095',
        rating: 4.5
    },
    {
        productName: 'AHA Sleep Mask',
        id: 'ahasleepmask',
        category: 'Glow',
        mrp: '995',
        rating: 4.3
    },
]

function displayProducts() {
    const clickToStartDiv = document.getElementById('clickToStart');
    const ratingFormDiv = document.getElementById('mainContainer');
    clickToStartDiv.style.display = 'none';
    ratingFormDiv.style.display = 'block';

    const productItemsList = document.getElementById('productName');
    for (let i = 0; i < productsList.length; i++) {
        productItemsList.innerHTML += `<option value=${productsList[i].id}>${productsList[i].productName}</option>`;
    }
}

function submitRating() {
    const productName = document.getElementById('productName').value;
    const rating = parseInt(document.getElementById('rating').value);

    const productNameInput = document.getElementById('productName');
    const ratingInput = document.getElementById('rating');

    if (isNaN(rating) || rating < 1 || rating > 5) {
        alert('Please enter a valid rating between 1 and 5.');
        return;
    }

    ratings[productName] = rating;
    updateRecommendations();

    productNameInput.value = productsList[0].id;
    ratingInput.value = 0;
}

function updateRecommendations() {
    const recommendedProductsElement = document.getElementById('recommendedProducts');
    const products = Object.keys(ratings);

    if (products.length === 0) {
        recommendedProductsElement.textContent = 'No recommendations yet.';
        return;
    }

    const getProductById = (productId) => productsList.find(product => product.id === productId);
    const lowRatingProduct = products.find(product => ratings[product] < 4);
    const highRatingProduct = products.find(product => ratings[product] > 4.5);
    const midRatingProduct = products.find(product => ratings[product] >= 4 && ratings[product] <= 4.5);

    if (lowRatingProduct) {
        showRecommendationsForLowRating(lowRatingProduct, getProductById);
    } else if (highRatingProduct) {
        showRecommendationsForHighRating(highRatingProduct, getProductById);
    } else if (midRatingProduct){
        showRecommendationsForMidRating(midRatingProduct, getProductById);
    }
}

function showRecommendationsForLowRating(lowRatingProduct, getProductById) {
    const otherCategoryProducts = productsList.filter(product => product.category !== getProductById(lowRatingProduct).category);
    const highestRatingOtherCategoryProducts = otherCategoryProducts.sort((a, b) => b.rating - a.rating || a.mrp - b.mrp);
    const recommendedProduct = highestRatingOtherCategoryProducts.find(product => product.id !== lowRatingProduct);
    updateRecommendedProductsElement(recommendedProduct, 'No recommendations from other categories.');
}

function showRecommendationsForHighRating(highRatingProduct, getProductById) {
    const highRatingProducts = productsList.filter(product => product.rating > 4.3 && product.id !== highRatingProduct);
    const sameCategoryProducts = highRatingProducts.filter(product => product.category === getProductById(highRatingProduct).category);
    const differentCategoryProducts = highRatingProducts.filter(product => product.category !== getProductById(highRatingProduct).category);
    sameCategoryProducts.sort((a, b) => b.rating - a.rating || a.mrp - b.mrp);
    differentCategoryProducts.sort((a, b) => b.rating - a.rating || a.mrp - b.mrp);
    const recommendedProduct = sameCategoryProducts[0] || differentCategoryProducts[0];
    if (recommendedProduct) {
        updateRecommendedProductsElement(recommendedProduct, 'No recommendations from the same category.');
    } else {
        updateRecommendedProductsElement(null, 'No recommendations above 4.3.');
    }
}


function showRecommendationsForMidRating(midRatingProduct, getProductById) {
    const midRatingProducts = productsList.filter(product => product.rating > 4.5 && product.id !== midRatingProduct);
    const sameCategoryProducts = midRatingProducts.filter(product => product.category === getProductById(midRatingProduct).category);
    const differentCategoryProducts = midRatingProducts.filter(product => product.category !== getProductById(midRatingProduct).category);
    sameCategoryProducts.sort((a, b) => b.rating - a.rating || a.mrp - b.mrp);
    differentCategoryProducts.sort((a, b) => b.rating - a.rating || a.mrp - b.mrp);
    
    const recommendedProduct = sameCategoryProducts[0] || differentCategoryProducts[0];
    if (recommendedProduct) {
        updateRecommendedProductsElement(recommendedProduct, 'No recommendations from the same category.');
    } else {
        updateRecommendedProductsElement(null, 'No recommendations above 4.5.');
    }
}

function updateRecommendedProductsElement(recommendedProduct, noRecommendationsMessage) {
    const recommendedProductsElement = document.getElementById('recommendedProducts');
    if (recommendedProduct) {
        recommendedProductsElement.innerHTML = `${recommendedProduct.productName}`;
    } else {
        recommendedProductsElement.innerHTML = noRecommendationsMessage;
    }
}
