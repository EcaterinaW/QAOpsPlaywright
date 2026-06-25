Feature: Ecommerce validations
    @Regression
    Scenario: Placing the order
        Given a login to Ecommerce application with "kirovichkate@gmail.com" and "U$u8An!A3DFRbbi"
        When Add "ZARA COAT 3" to cart
        Then click checkout button in the cart
        When enter valid details and place order
        Then verify order is present in order history

    @Validation
    Scenario Outline: Placing the order
        Given a login to Ecommerce2 application with "<username>" and "<password>"
        Then Verify Error message is displayed

        Examples:
            | username               | password |
            | kirovichkate@gmail.com | djshhsa  |
            | kirovichaa12@gmail.com | dfwtw55  |