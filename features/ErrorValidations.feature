Feature: Ecommerce validations
    @Validation
    Scenario Outline: Placing the order
        Given a login to Ecommerce2 application with "<username>" and "<password>"
        Then Verify Error message is displayed

        Examples:
            | username                | password | 
            | kirovichkate@gmail.com  | djshhsa  |
            | kirovichaa12@gmail.com  | dfwtw55  |  