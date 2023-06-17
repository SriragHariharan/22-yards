import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import '../../styles/homepage/Brands.css'

function Brands() {
  return (
    <div className='brands'>
        <Container>
            <Row>
                <Col xs={12} sm={12} md={12}>
                <div className="text-center mb-5">
                    <h4 className="section-title px-5"><span className="px-2">Brands</span></h4>
                </div>
                </Col>

                <Col xs={2} sm={2} md={2}>
                    <img className='brands-logo' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaY_ub3zHafOfbbYGaux9ohMaWMKDk1ZP3nnCOor-U&s" alt="" />
                </Col>

                <Col xs={2} sm={2} md={2}>
                    <img className='brands-logo' src="https://storage.sg.content-cdn.io/in-resources/b368029c-a4dd-448a-a888-58348cb1b144/Images/userimages/Brands/SSLogoL.jpg" alt="" />
                </Col>

                <Col xs={2} sm={2} md={2}>
                    <img className='brands-logo' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTMj5Tpp5-lI0l724JvOy-5gatpCysuqeUy_8KKa9cdzszdJZOrzO1a0OMjTQj19Nw_Q&usqp=CAU" alt="" />
                </Col>

                <Col xs={2} sm={2} md={2}>
                    <img className='brands-logo' src="https://www.logolynx.com/images/logolynx/42/422ee1c5ee4a98aceb352bcc8b557dae.jpeg" alt="" />
                </Col>

                <Col xs={2} sm={2} md={2}>
                    <img className='brands-logo' src="https://upload.wikimedia.org/wikipedia/commons/d/dc/Gunn_moore_logo.png" alt="" />
                </Col>

                <Col xs={2} sm={2} md={2}>
                    <img className='brands-logo' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTS9CtbCXLsybnrTduSSqGjDoPGXHE9FXMqracSEq5sYA&s" alt="" />
                </Col>

                <Col xs={2} sm={2} md={2}>
                    <img className='brands-logo' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQ-JgbhRaBUqmtKWYZCpnkisnbygCTc7oj3-eoNw7Fzw&s" alt="" />
                </Col>

                <Col xs={2} sm={2} md={2}>
                    <img className='brands-logo' src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxIQEhUPEBAPDxIVEhAWFRAPFRUVFRYQFRIYFhUXFhMYHSggGBslGxcVIjEhJSkrLi4uFx8zODMtNygtLisBCgoKDQ0OFQ0PFSsZFRkrKysrKysrKysrKysrLS0rKysrKzcrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAOEA4QMBIgACEQEDEQH/xAAcAAEAAQUBAQAAAAAAAAAAAAAABwEDBQYIBAL/xABNEAABAwICBAUNDQcDBQAAAAAAAQIDBBEFEgYHITETQVFxsRQXIjI1VWFzdIGRkrMIFiQ0QlJTcpOhstHTFSMzVGLB8CVDgoOUoqPx/8QAFgEBAQEAAAAAAAAAAAAAAAAAAAEC/8QAFhEBAQEAAAAAAAAAAAAAAAAAAAFB/9oADAMBAAIRAxEAPwCcQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFFAFQUuVAAAAAAAAAAAAAAABQCoKFQABRQPLimIR00T553pHGxqq57tyJ/c1aLS6tmThaXCZ5Id7XzPZE57eJWxuW/pPjTpiTVuGUktuAkqZnvau5z4YHPjav/ACIx0kx+qjqcRXqnEmpFM1sKwzObBE51kThGXsjfMBMujmlMVY58Kskp6mO3CU0yWe1F405W8ipvM+RxiMUka4RVyPbJVrLFDJIz/cimZ2XOm5b+AkgAAAAUADWNO9LG4VA2pfE6ZHSIzK1URdrVW915jSF13s73VHFxpxnu90Cv+nx+Us/A83fR6nZ1LAuRifuIfkt+Ym9bAR118Gd76j1kHXvZ3vqPWQkla+l3cNTetGOr6T6am9aMCNuvgzvfUesg6+DO98/rISV1dSfTU3rRlOr6T6am9aMCNevgzvfP6yDr4R976j1kJL6upPpqb1oy9TSQS34N0UlrXyZFtflsgEZ02uqN8jI3UUsedyNzPeiIiZrKvMhm8e1s4bSqrGyuqHItrQpdL8mddha1g6AvxSpgVr2QQxskSRyImZXOcioiNtbl2mU0e1d4dRIisp2yv45Z+zcvh27EINPfrpVy3hw2d6fOVV3eZD7p9djEW1Rh9REnL09siX4txJEmJUcPYumpo03ZczEsvMUzUdUmX4LOnzewdv8AAUYrR7WFh9auWKoax6/7U3YO81959ad6YtwqKOZ0LpkkkyWYqJ8m97qYTSXVLQ1KK6Bq0c29HxKqtv4Wru8xFWm9NiVHG2grnLLA2RXwy9sna7Ezr0Ab3172d76j1kKdfBne+o9ZCS8Hp2dTw9iz+DF8lvzE8BTq+k+mpvWjAjZNd7O99R6yfkfK68o02LQTovIrmovoUk6GpppFyNkgeq/JarFVU49iIRvrV0PTh4MSp2WVJqds7WIna8IiI6wVbXXezvfUeshTr4M731HrISq6JjW5laxqIm9UaiInoPL1fSfTU3rRhEadfBne+o9Zp9M13RqrUWgnbmcjUVzm2urkRfRdPSSdTywSLaN8Miol1RisctvMhFuvqJGrQWRqfvpLqiJtRHRbNiAb/pXgS18LFjfwFRE9k1PMnyJUTcv9KpdF5zT2wujbUxVOB1EklTl4dad7HQzOTc5qucisJMpu0b9VvQhdsBoOiei8qyQz1MSU0NM1yUlFn4RY1ddFkkeu99lsnIb+UsVAAACgAAjD3QXc+Pylvs3m9YJ8Th8mj9mhonugu58flLfZvN9wBt6SBOWni9mgVyjiP8WTxsvEn0jjzf5uT8iZKrUe973PTEWIjnvdbqZVtmcrrX4bwmNxvU2+lp5aha9snBRPkyJTq3NlS9s3DLa/LZSCLvN9yfkUt/mz8ghn9CdGVxOp6lSZIF4N786s4TtbbMuZu+++5FYD/NyfkTD7nvtqv/pdB89YqTvlH/2zv1jbtBNCv2I2omlqmztc1HKqRcHlbGl1+W6+wqM9pfpZBhsPDTLdVujI0tme7kS5z/pPrBrq9y3l4CG65YIbtRG+F17uUx+mOkcmI1T6iRVy5nNiYi3RsaLZOdV5TDMaqqiIiqqrZETat+RE41Ao5L9t2S8rrKvpVFU+6eZ0a5o3PjVNysdlX7rG5YNqtxKpYknBRwNXck7srlT6qItjH6S6C12Hpwk8OaP6SFc6JzpxBWwaGa16mle2OsVaqn2Irl/is4rou5yeAmispaXFqTKuWeCVvYuTei22OReJyKcpf4i9CoSRqX0sdTVSUMjv3E6qjcy9pPa6ZfA7kCJ5p4ODibHfMjY0bdeNGtscetTz+FbXX7jsiXtV5lON0BHrwrEZaWaOphdlkjcjk5F27Wrs7Vdx1NozjUWJUsdSxEVsjUzMdbsXpvaqeBTk+xIGqDS/qKp6nmdaCdUuvEya3YutxIu7nAnDTBPgNT4iT8JyaxNicyb7fkdZaYLehqfESfhOTmbvMgEpe5+T4ZUeTJ7VOTnM5r930HjpPxRGD9z98cqPJU9q0zmv3fQeOk6YiiWKXtG/Vb0IXS1S9o36reguhAAAAABQFSgEb69KOSahjZFG+VeqGqqRoqrbI5FXYi8pgKDWViUMccSYS9yMY1t8sqbGpYmewUCHYdbdZw0UE2HNh4R7ERX502K5EVUvbddPSSJpt3PqvJp/wkd65+6OGc71/wDdEhIemvc+q8mqPwkVyo3d6OgkDUd3UTyafpaR+zd6OgkDUd3UTyafpaCp4xTEHRS08bWo5JpXMcq70akTn3TztNd1vVyw4XOrVsr8kd/A91lsZLSeoSOegVdy1bm+d8EjU+9UMRrmplkwuWyXyOjeqJyI7aEc3XJQ1F6OMqJpauVqPSHK1iLuSR229iLyXtQGMMY+oo3qiOkVkrP6rNyqnOSKmvLzlupgbI1WPajmuRUVqpdFQuofL12b7Gkcs6wMDSgr5qdn8O6PZ4GPS6J0mDpZ1jkZI1bKx7HIvIrXovRc2bWhizKvEZpI1zMbljR3LkSyr6TV4Y1e5rES6ucjUTwus3+5mq69p5s8LX/Oja70tRTj5Dr+ihyQMYu9sLG+hiIcgIWkXGMV18qK6yKq2Tcib15i3926221uRUN11Q07ZcSbFIiOY+nqGuavG1UahitONGn4bVvp1RViVVdC/idEq3ROdu4ipT0Q0u6vwioglX4RBTyNdyuZZcruexBjNycyHsw3EZKdznxLlVzHMdyKxyWVFPIiASj7n745UeSp7VpnNfu+g8dJ0xGD9z98cqPJU9q0zmv3fQeOk6YjSalil7Rv1W9CF0tUvaN+q3oQuoEAUKgAABQAqBQopUKBDuujujhnO728RIemvc+q8mqPwkea5+6OGf8AL28RIemvc+q8mqPwkHKjN3o6CQNR3dRPJp+lpH7N3o6Df9R3dRPJqjpaFqQ9d9Y6Cmp52dtHWRPbzobhG6HEqO6LmhqIV8yPb0oppGv9fgMXlDehTB6pdKXUUn7Jrbxo5Wuhc9diLIl0S67kdxARhj2ESUVRLSzNVHRvVNu5zFXsHJyoqHmpKl8T2yxOcyRjszXN3ov9+Y6Q1h6Cx4pGj22iqmJZkvKnzXcqHPWO4JUUMnA1UToXXXKq9q9OVruMCRcI11zxsRtTTNncn+4xcir4VRf7GL0r1s1VYxYYWNpY17ZWrmeqcl+LjI9KOX/74AKm76ptGXVtayVzV4CnXO9bbFkTtG3+8x+hmg9VibkVjHRU/wAqoeio23JHftlOhcFwmmwqlyMyxxRtV8kjtiqqbVc5QM1JuXmU43adixzJJGj27WuajkXwKl0OO27hSN61K91Y/Ez9DSXtZuiaYjSqjU/fxIr4ncq22t85EOpRf9Vj8TP0NOkLArjd7FRVRyK1UVUVq70cmxUXzlCTtdWiPU037QhbaKZ371qbEZPuzcztnnIxAlH3P3xyo8lT2rTOa/d9B46TpiMH7n745UeSp7VpnNfu+g8dJ0xFNSxS9o36rehC4W6XtG/Vb0IXQigKgCgKgCgKlABRT6KKgEO65+6OGc7vbREsVtGyeN0MqZmPa5rm3VLtdvNA1paF1mIT001GsTVgZJ2UjrKj1exWqmxfmqYf3taUd8W+aRn6ZFbWmqvCv5VftH/mZHAdBaGil6opoVjkyubmzOXsXb96+A0L3taUd8W/aM/TK+9rSjvk37Rn6YRkfdAr8Aj8en4VPbpBoLFilBTORUjqWUsOSXl/dN7F3gNRxnQDSCsZwVVVxTsRbo18iWRbeBhMuEU7o4IYnWzMhiYvGmZrERegCJNHNP6nCn/s/GI5VRnYsqFS7sibuy3PTmJQosQo8Ri7B8FVG7e1crvSxdyl7GcDp6xnBVMLJm/1JtT6rk2oRximphiOWShrJqZ3E1yqqJzPaqOQDaKnVnhUi5lomN+ormp6EU9GHav8NgdnjoocyWsr7vtzI7caJ7zNIouxixNXNTYmaZ+7mciny/V9jtT2NVir2s40SaRU8PYsy384VIWkWmFFhzLzTMRUTZFHZXeqm4hDT7TKqxRmfg3w0CPRGt22fIiKqK5y7HW5E3Ej4Dqco4HJJUukrH77P7Fl/CnH5z3ay9DZa6mhp6JkMfBy5sqrkaiZbcSbQNvwZL00KL9BFu8Whq/Wswr+V/8AN3Rc1GLRfSdqI1uIMa1qIiIkjdiIlk3xn172tKO+TftGfphG94JoFQUUqVFPBklRFRHK5y9iu/eeXWbpBJh0EVVHdctTGjm/Ojdscnh5fMad72tKO+TfXZ+mePFdBNIKtnBVVXFPHdFyPkS2ZOZgErolPidKl0bNBOxFtyou22zjRTAdavCv5VfXf+ZpOFaDaQ0kaQ01ZHDGirZjZUVEuvFdh6ve1pR3yb9oz9MCQdHtDaKge6Wlh4Nz25HLmVbtui8a8qGh6/N+H+Ol6Yi172tKO+LftGfpnixHV9jtW6PqypiqGxvzIj5E2dk1VsiMTiQqxNdL2jfqt6ELh8U7MrURd6IiLzohcCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/9k=" alt="" />
                </Col>

                <Col xs={2} sm={2} md={2}>
                    <img className='brands-logo' src="data:image/jpeg;base64,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" alt="" />
                </Col>

                <Col xs={2} sm={2} md={2}>
                    <img className='brands-logo' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhUNMzQLQ43Gf1YAwvEk7X_JGnROvD9jLdNx-oRhqWCbiFylA8g8YxrylBLuqcHg-Kt5s&usqp=CAU" alt="" />
                </Col>

                <Col xs={2} sm={2} md={2}>
                    <img className='brands-logo' src="data:image/jpeg;base64,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ddUYrTZX1NJRS4TZxmcdihk3on5zT0FtlZcism7NEYvqdJK/RpNiewL4rMEaKkOcy8zCWDRrNxbq0LS8EwsU0BBtnlrnOPJq5rIMXyt8em/8hnrsW1Q/ORebb6ixLLWYRmB5vZswceIOaTZXWLuuYaM0ltVnNaBfYhuC32kGmrG+6L9NQ+bPqhT/AMM2HfZqvQt9pUfG8pYcUxWKanEgYGFvx2hpvm7wJ3lBomTuULKWLY3scTnl1xvEDsUyzK+A684cjj1BRuS+BQ1MOyStJdsjm6HOboAG9xqbZkzTD9HzucVR8syppTrlI/ly+yvZmUFM7VMPyvHWF9NwGnH6JvKLr1bhMA/Qxejaf7KD6jxOJ2qRvUuhsrTqc08oXiKCIaoYh/Lb2L1ZTsbqY0cTQEHoiIgIiICIiAiIg8J3vHiNBO+SLdajagVjvF2Fo37G/rKZRBVKjCq6Txpxbe0BcL8kp3a3tPL71eUQUF+RUrtZYf8AONfPgPJ+Hze9aAitGf8AgPJ+Hze9PAeT8Pm960BEooHgPJ+Hze9fngPJ+Hze9aAiUUDwHk/D5vevzwHk/D5vetARKKB4Dyfh83vXXhmRzo5Gl5bmB2cQN0jUroig4sWpDNA6JtgS3NHk0KnPyKldrMZ/zjV+RBQPAeT8Pm96eA8n4fN71f0VooLMipW6jGP841dMMpzFE1h1gWPOupFBHzYTG+Zs5HxmjnOix5LLukbcEb4I6F9IgoUmRkrtZYf8418eA8n4fN71oCJRn/gPJ+Hze9fTciZBpBjB4ver8iURWTmHOpYdjeQTnudo3iB2KVREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERB//2Q==" alt="" />
                </Col>

                <Col xs={2} sm={2} md={2}>
                    <img className='brands-logo' src="data:image/jpeg;base64,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" alt="" />
                </Col>
                
            </Row>
        </Container>
    </div>
  )
}

export default Brands